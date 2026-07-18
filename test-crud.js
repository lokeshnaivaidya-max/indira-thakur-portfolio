const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3096;

function log(msg) { console.log(msg); }

function request(method, urlPath, cookie, body) {
  return new Promise((resolve) => {
    const headers = {};
    if (cookie) headers['Cookie'] = cookie;
    if (body && typeof body === 'string') {
      headers['Content-Type'] = 'application/json';
    }
    const opts = { hostname: 'localhost', port: PORT, path: urlPath, method, headers, timeout: 30000 };
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        let isJSON = false;
        try { JSON.parse(data); isJSON = true; } catch {}
        resolve({ status: res.statusCode, isJSON, body: data.substring(0, 500), ct: res.headers['content-type'] || '' });
      });
    });
    req.on('error', (e) => resolve({ status: 'ERR', isJSON: false, body: e.message, ct: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT', isJSON: false, body: '', ct: '' }); });
    if (body) req.write(body);
    req.end();
  });
}

function reqJSON(method, urlPath, cookie, obj) {
  return request(method, urlPath, cookie, JSON.stringify(obj));
}

const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
  cwd: path.join(__dirname), shell: true, stdio: 'pipe'
});

let out = '';
server.stdout.on('data', (d) => out += d.toString());
server.stderr.on('data', (d) => out += d.toString());

let ready = false;
const check = setInterval(async () => {
  if (out.includes('Ready') || out.includes('ready')) {
    ready = true;
    clearInterval(check);
    log('Server ready on port ' + PORT);
    await sleep(1000);
    await main();
  }
}, 500);

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  try {
    // Step 1: Login
    log('\n=== STEP 1: Login ===');
    const login = await reqJSON('POST', '/api/auth/login', null, {
      email: 'admin@indirathakur.com', password: 'admin123'
    });
    log(`Login: HTTP ${login.status} | JSON: ${login.isJSON} | Body: ${login.body}`);
    
    let cookie = '';
    if (login.isJSON) {
      const parsed = JSON.parse(login.body);
      if (parsed.token) cookie = `auth_token=${parsed.token}`;
    }
    log(`Auth cookie: ${cookie ? 'obtained' : 'FAILED - no token'}`);

    // Step 2: Create Service
    log('\n=== STEP 2: Create Service ===');
    const svc = await reqJSON('POST', '/api/services', cookie, {
      title: 'Newborn Photography', slug: 'newborn-photography',
      description: 'Beautiful newborn photos', heroImage: '',
      benefits: ['Professional'], gallery: [], price: '₹5000',
      cta: 'Book Now', featured: false, order: 0
    });
    log(`Service Create: HTTP ${svc.status} | JSON: ${svc.isJSON} | CT: ${svc.ct} | Body: ${svc.body}`);

    // Step 3: Create Gallery Image (URL method)
    log('\n=== STEP 3: Create Gallery Image ===');
    const gal = await reqJSON('POST', '/api/gallery-images', cookie, {
      src: 'https://images.unsplash.com/photo-12345?w=800', alt: 'Test',
      title: 'Test Image', description: '', width: 800, height: 1000,
      category: 'Portrait', featured: false, order: 0
    });
    log(`Gallery Create: HTTP ${gal.status} | JSON: ${gal.isJSON} | CT: ${gal.ct} | Body: ${gal.body}`);

    // Step 4: Create Testimonial
    log('\n=== STEP 4: Create Testimonial ===');
    const test = await reqJSON('POST', '/api/testimonials', cookie, {
      name: 'Happy Client', role: 'Mother', content: 'Amazing work!',
      rating: 5, featured: false, order: 0, image: '', publicId: ''
    });
    log(`Testimonial Create: HTTP ${test.status} | JSON: ${test.isJSON} | CT: ${test.ct} | Body: ${test.body}`);

    // Step 5: Create Review
    log('\n=== STEP 5: Create Review ===');
    const rev = await reqJSON('POST', '/api/reviews', cookie, {
      name: 'Google User', rating: 5, content: 'Excellent!',
      source: 'google', featured: false, date: '2026-01-01'
    });
    log(`Review Create: HTTP ${rev.status} | JSON: ${rev.isJSON} | CT: ${rev.ct} | Body: ${rev.body}`);

    // Step 6: Create FAQ
    log('\n=== STEP 6: Create FAQ ===');
    const faq = await reqJSON('POST', '/api/faqs', cookie, {
      question: 'How to book?', answer: 'Contact us!', category: 'General', order: 0
    });
    log(`FAQ Create: HTTP ${faq.status} | JSON: ${faq.isJSON} | CT: ${faq.ct} | Body: ${faq.body}`);

    // Step 7: Dashboard stats
    log('\n=== STEP 7: Dashboard Stats ===');
    const dash = await request('GET', '/api/dashboard', cookie);
    log(`Dashboard: HTTP ${dash.status} | JSON: ${dash.isJSON} | CT: ${dash.ct} | Body: ${dash.body}`);

    // Step 8: Upload file (small test)
    log('\n=== STEP 8: File Upload (simulated) ===');
    // Can't easily do multipart in raw http, test the endpoint existence
    const uploadTest = await reqJSON('POST', '/api/upload', cookie, { test: true });
    log(`Upload POST: HTTP ${uploadTest.status} | JSON: ${uploadTest.isJSON} | CT: ${uploadTest.ct} | Body: ${uploadTest.body}`);

    // Summary
    const allResults = [login, svc, gal, test, rev, faq, dash, uploadTest];
    const jsonCount = allResults.filter(r => r.isJSON).length;
    const notJSON = allResults.filter(r => !r.isJSON);
    
    log('\n=== FINAL SUMMARY ===');
    log(`JSON responses: ${jsonCount}/${allResults.length}`);
    if (notJSON.length > 0) {
      log('\nNON-JSON RESPONSES (ROOT CAUSE):');
      notJSON.forEach(r => log(`  HTTP ${r.status} | CT: ${r.ct} | Body: ${r.body}`));
    } else {
      log('ALL endpoints return valid JSON!');
    }

  } catch (e) {
    log('FATAL ERROR: ' + e.message);
  }
  
  server.kill('SIGTERM');
  setTimeout(() => process.exit(0), 1000);
}

setTimeout(() => {
  if (!ready) {
    log('TIMEOUT - server never became ready');
    log('Output: ' + out.substring(0, 500));
    server.kill('SIGTERM');
    process.exit(1);
  }
}, 90000);

server.on('exit', (code) => {
  if (!ready) {
    log('Server exited: ' + code);
    log('Output: ' + out.substring(0, 500));
    process.exit(1);
  }
});

export function renderAbout() {
  const root = document.getElementById('app');
  root.innerHTML = `
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="mb-2">Hakkımızda</h4>
            <p class="text-muted">Ustam Sensin, İzmit sanayide doğru ustayı hızlıca bulmanızı ve onarım sürecini şeffaf biçimde takip etmenizi sağlayan demo bir web uygulamasıdır.</p>
            <ul class="mb-0">
              <li>Usta keşfi ve filtreleme</li>
              <li>İş emri oluşturma</li>
              <li>Adım adım süreç takibi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}



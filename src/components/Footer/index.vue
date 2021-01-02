<template>
  <footer class="footer">
    <div class="footer__addr">
      <h1 class="footer__logo">Vexere</h1>

      <h2>Liên hệ</h2>

      <address>
        112 Cao Thắng, Quận 3, Thành phố Hồ Chí Minh<br />

        <a class="footer__btn" href="mailto:tphat0127@gmail.com">Phản hồi</a>
      </address>
    </div>

    <ul class="footer__nav">
      <li class="nav__item">
        <h2 class="nav__title">Về chúng tôi</h2>

        <ul class="nav__ul">
          <li>
            <a href="#">Giới Thiệu VeXeRe</a>
          </li>

          <li>
            <a href="#">Tin tức</a>
          </li>

          <li>
            <a href="#">Liên hệ</a>
          </li>
        </ul>
      </li>

      <li class="nav__item nav__item--extra">
        <h2 class="nav__title">Hỗ trợ</h2>

        <ul class="nav__ul nav__ul--extra">
          <li>
            <a href="#">Đại lý</a>
          </li>

          <li>
            <a href="#">Chính sách bảo mật</a>
          </li>

          <li>
            <a href="#">Câu hỏi thường gặp</a>
          </li>
        </ul>
      </li>

      <li class="nav__item">
        <h2 class="nav__title">Thanh toán</h2>

        <ul class="nav__ul">
          <li>
            <a href="#">Hướng dẫn thanh toán</a>
          </li>

          <li>
            <a href="#">Chính sách bảo mật thanh toán</a>
          </li>

          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </li>
    </ul>

    <div class="legal">
      <p>&copy; 2020 Nguyễn Tấn Phát</p>

      <div class="legal__links">
        <span
          >Thanks to Cybersoft <span class="heart">♥</span></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.footer {
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 20px 30px;
  margin-top: 10px;
  color: #2f2f2f;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
}

.footer > * {
  flex: 1 100%;
}

.footer__addr {
  margin-right: 1.25em;
  margin-bottom: 2em;
}

.footer__logo {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  text-transform: lowercase;
  font-size: 1.5rem;
}

.footer__addr h2 {
  margin-top: 1.3em;
  font-size: 15px;
  font-weight: 400;
}

.nav__title {
  font-weight: 400;
  font-size: 15px;
}

.footer address {
  font-style: normal;
  color: #999;
}

.footer__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  max-width: max-content;
  background-color: rgb(33, 33, 33, 0.07);
  border-radius: 100px;
  color: #2f2f2f;
  line-height: 0;
  margin: 0.6em 0;
  font-size: 1rem;
  padding: 0 1.3em;
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer li {
  line-height: 2em;
}

.footer a {
  text-decoration: none;
}

.footer__nav {
  display: flex;
  flex-flow: row wrap;
}

.footer__nav > * {
  flex: 1 50%;
  margin-right: 1.25em;
}

.nav__ul a {
  color: #999;
}

.nav__ul--extra {
  column-count: 2;
  column-gap: 1.25em;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  color: #999;
}

.legal__links {
  display: flex;
  align-items: center;
}

.heart {
  color: #2f2f2f;
}

@media screen and (min-width: 24.375em) {
  .legal .legal__links {
    margin-left: auto;
  }
}

@media screen and (min-width: 40.375em) {
  .footer__nav > * {
    flex: 1;
  }

  .nav__item--extra {
    flex-grow: 2;
  }

  .footer__addr {
    flex: 1 0px;
  }

  .footer__nav {
    flex: 2 0px;
  }
}
</style>

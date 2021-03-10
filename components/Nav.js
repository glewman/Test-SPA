import html from "html-literal";
import links from '../store/Links';

export default (st) => html `
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
    ${st
      .map(
        (link) => `<li><a href="/${link.title}" data-navigo>${link.text}</a></li>`
      )
      .join("")}
    </ul>
  </nav>
  `;
// export default (links) => `
//   <nav>
//     <i class="fas fa-bars"></i>
//     <ul class="hidden--mobile nav-links">
//     ${links
//       .map(
//         (link) => `<li><a href="/${link}" data-navigo>${link}</a></li>`
//       )
//       .join()}
//     </ul>
//   </nav>
//   `;
// import html from "html-literal";

// export default (st) => html `
// <nav>
//   <i class="fas fa-bars"></i>
//   <ul class="hidden--mobile nav-links">
//   arr.map((el) => `<li><a href="#">${el}</a></li>`).join();
//   </ul>
// </nav>
// `;

// <li><a href="#bio">Bio</a></li>
//<li><a href= "#gallery">Gallery</a></li>
//<li><a href="#register">Register</a></li>
// ${st.reduce(
//   (template, link) => {
//   html + `<li><a href="/${link.title !== "Home" ? link.title : ""} "title ="${link.title}">${link.text}</a></li>`, ``;
// // })}

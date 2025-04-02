import { navbar } from "vuepress-theme-hope";

export default navbar([
  // Home
  "/",
  // { text: "🏠 Home", link: "/" },

  // Demo
  // "/demo/",

  // EECS
  {
    text: "📝 EECS",
    // icon: "pen-to-square",
    // link: "/eecs/",
    prefix: "/posts/",
    children: [
      {
        text: "👉 CS",
        // icon: "pen-to-square",
        prefix: "apple/",
        children: [
          // { text: "Apple1", icon: "pen-to-square", link: "1" },
          // { text: "Apple2", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "👉 EE",
        // icon: "pen-to-square",
        prefix: "apple/",
        children: [
          // { text: "Apple1", icon: "pen-to-square", link: "1" },
          // { text: "Apple2", icon: "pen-to-square", link: "2" },
        ],
      },
    ],
  },

  // Algorithm
  {
    text: "🧠 Algorithm",
    // icon: "pen-to-square",
    prefix: "/posts/Algorithm/",
    children: [
      {
        text: "👉 Codeforces",
        // icon: "pen-to-square",
        link: "Codeforces/",
        prefix: "Codeforces/",
      },
      {
        text: "👉 AtCoder",
        // icon: "pen-to-square",
        link: "AtCoder/",
        prefix: "AtCoder/",
      },
      {
        text: "👉 Topic Index",
        // icon: "pen-to-square",
        link: "Topic/index",
        prefix: "Topic/",
        // children: [
        //   { text: "Topic Index", icon: "pen-to-square", link: "index" },
        // ],
      },
      {
        text: "👉 Template Index",
        // icon: "pen-to-square",
        link: "Template/index",
        prefix: "Template/",
        // children: [
        //   { text: "Template Index", icon: "pen-to-square", link: "index" },
        // ],
      },
    ],
  },

  // Book
  {
    text: "📚 Book",
    // icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "👉 BookType1",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
        //   { text: "Apple1", icon: "pen-to-square", link: "1" },
        //   { text: "Apple2", icon: "pen-to-square", link: "2" },
        //   "3",
        //   "4",
        ],
      },
    ],
  },

  // Project
  {
    text: "🛠 Project",
    // icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "👉 Project1",
        icon: "pen-to-square",
        prefix: "Codeforces/",
        children: [
          // { text: "132-edu", icon: "pen-to-square", link: "132-edu" },
          // { text: "133-edu", icon: "pen-to-square", link: "133-edu-div2" },
        ],
      },
      {
        text: "👉 Project2",
        icon: "pen-to-square",
        prefix: "AtCoder/",
        children: [
          // { text: "abc-259", icon: "pen-to-square", link: "abc-259" },
          // { text: "abc-260", icon: "pen-to-square", link: "abc-260" },
        ],
      },
    ],
  },

  // Vlog
  {
    text: "📷 Vlog",
    // icon: "pen-to-square",
    prefix: "/posts/",
    // link: "/vlog/",
    children: [
      {
        text: "👉 VlogType1",
        icon: "pen-to-square",
        prefix: "Codeforces/",
        children: [
          // { text: "132-edu", icon: "pen-to-square", link: "132-edu" },
          // { text: "133-edu", icon: "pen-to-square", link: "133-edu-div2" },
        ],
      },
      {
        text: "👉 VlogType2",
        icon: "pen-to-square",
        prefix: "AtCoder/",
        children: [
          // { text: "abc-259", icon: "pen-to-square", link: "abc-259" },
          // { text: "abc-260", icon: "pen-to-square", link: "abc-260" },
        ],
      },
    ],
  },

  // About
  // {
  //   text: "V2 Docs",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/",
  // },

  { text: "👤 About Me", link: "/intro" },
]);

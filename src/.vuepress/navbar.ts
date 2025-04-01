import { navbar } from "vuepress-theme-hope";

export default navbar([
  // Home
  "/",
  // { text: "🏠 Home", link: "/" },

  // Demo
  "/demo/",

  // Posts
  // {
  //   text: "Posts",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Apple",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "Apple1", icon: "pen-to-square", link: "1" },
  //         { text: "Apple2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "Banana",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "Banana 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "Banana 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "Cherry", icon: "pen-to-square", link: "cherry" },
  //     { text: "Dragon Fruit", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },

  // { text: "📘 課程筆記", link: "/book/" },

  // EECS
  {
    text: "📝 EECS",
    icon: "pen-to-square",

    // link: "/eecs/",
    prefix: "/posts/",
    children: [
      {
        text: "CS",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "EE",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
        ],
      },
    ],
  },

  // Algorithm
  {
    text: "🧠 Algorithm",
    icon: "pen-to-square",
    // link: "/algorithm/",
    prefix: "/posts/Algorithm/",
    children: [
      {
        text: "Codeforces",
        icon: "pen-to-square",
        prefix: "Codeforces/",
        children: [
          { text: "132-edu", icon: "pen-to-square", link: "132-edu" },
          { text: "133-edu", icon: "pen-to-square", link: "133-edu-div2" },
        ],
      },
      {
        text: "AtCoder",
        icon: "pen-to-square",
        prefix: "AtCoder/",
        children: [
          { text: "abc-259", icon: "pen-to-square", link: "abc-259" },
          { text: "abc-260", icon: "pen-to-square", link: "abc-260" },
        ],
      },
    ],
  },

  // Book
  {
    text: "📚 Book",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "BookType1",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "BookType2",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "BookType3",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "Apple1", icon: "pen-to-square", link: "1" },
          { text: "Apple2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
    ],
  },

  // Project
  {
    text: "🛠 Project",
    icon: "pen-to-square",
    // link: "/project/",
    prefix: "/posts/",
    children: [
      {
        text: "Project1",
        icon: "pen-to-square",
        prefix: "Codeforces/",
        children: [
          { text: "132-edu", icon: "pen-to-square", link: "132-edu" },
          { text: "133-edu", icon: "pen-to-square", link: "133-edu-div2" },
        ],
      },
      {
        text: "Project2",
        icon: "pen-to-square",
        prefix: "AtCoder/",
        children: [
          { text: "abc-259", icon: "pen-to-square", link: "abc-259" },
          { text: "abc-260", icon: "pen-to-square", link: "abc-260" },
        ],
      },
    ],
  },

  // Vlog
  {
    text: "📷 Vlog",
    icon: "pen-to-square",
    prefix: "/posts/",
    // link: "/vlog/",
    children: [
      {
        text: "VlogType1",
        icon: "pen-to-square",
        prefix: "Codeforces/",
        children: [
          { text: "132-edu", icon: "pen-to-square", link: "132-edu" },
          { text: "133-edu", icon: "pen-to-square", link: "133-edu-div2" },
        ],
      },
      {
        text: "VlogType2",
        icon: "pen-to-square",
        prefix: "AtCoder/",
        children: [
          { text: "abc-259", icon: "pen-to-square", link: "abc-259" },
          { text: "abc-260", icon: "pen-to-square", link: "abc-260" },
        ],
      },
    ],
  },

  // About
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },

  { text: "👤 About Me", link: "/intro" },
]);

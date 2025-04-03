import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    // home
    "",

    // Demo
    // {
    //   text: "Demo",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },

    // EECS section
    {
      text: "📝 EECS",
      // icon: "book",
      prefix: "posts/EECS/",
      // Whether current group is collapsible
      collapsible: true,
      // Whether current group is expanded by default
      expanded: false,
      // automatically generate sidebar items by useing the 'structure' option
      children: "structure",
    },

    // Algorithm section
    {
      text: "🧠 Algorithm",
      // icon: "book",
      prefix: "posts/Algorithm/",
      // Whether current group is collapsible
      collapsible: true,
      // Whether current group is expanded by default
      expanded: true,
      // automatically generate sidebar items by useing the 'structure' option
      // children: "structure",
      children: [
        {
          text: "👉 Template Index",
          link: "Template/index",
        },
        {
          text: "👉 Topic Index",
          link: "Topic/index",
        },
        {
          text: "👉 AtCoder",
          // link: "AtCoder/",
          // icon: "book",
          prefix: "AtCoder/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "👉 Codeforrces",
          // link: "Codeforces/",
          // icon: "book",
          prefix: "Codeforces/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "👉 All Templates",
          // link: "Template/",
          // icon: "book",
          prefix: "Template/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "👉 All Topics",
          // link: "Topic/",
          // icon: "book",
          prefix: "Topic/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
      ],
    },

    // Book section
    {
      text: "📚 Book",
      // icon: "book",
      prefix: "posts/Book/",
      // Whether current group is collapsible
      collapsible: true,
      // Whether current group is expanded by default
      expanded: false,
      // automatically generate sidebar items by useing the 'structure' option
      children: "structure",
    },

    // Project section
    {
      text: "🛠 Project",
      // icon: "book",
      prefix: "posts/Project/",
      // Whether current group is collapsible
      collapsible: true,
      // Whether current group is expanded by default
      expanded: false,
      // automatically generate sidebar items by useing the 'structure' option
      children: "structure",
    },

    // Vlog section
    {
      text: "📷 Vlog",
      // icon: "book",
      prefix: "posts/Vlog/",
      // Whether current group is collapsible
      collapsible: true,
      // Whether current group is expanded by default
      expanded: false,
      // automatically generate sidebar items by useing the 'structure' option
      children: "structure",
    },

    // Intro
    "intro",

    // Slides
    // {
    //   text: "Slides",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    // },
  ],
});

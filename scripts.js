$(document).ready(function (e) {
  let markedWebsites = [
    {
      name: "Node",
      page: "https://note.ms",
      logo:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1565914241,2549589705&fm=26&gp=0.jpg",
    },
    {
      name: "哔哩哔哩",
      page: "https://www.bilibili.com",
      logo:
        "https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch1000/png/导航List_bilibili.png",
    },
    {
      name: "Udemy",
      page: "https://www.udemy.com",
      logo:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=429349584,4148083755&fm=26&gp=0.jpg",
    },
  ];

  function hide() {
    $(".addSiteForm").attr("style", "visibility:hidden;");
    $(".info-down > input").val("");
    $(".shade").removeClass("fade");
  }

  function mySubmit() {
    const defaultLogo =
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1003709042,117090939&fm=26&gp=0.jpg";
    let name = $("input[name='name']").val() || "unknow";
    let page = $("input[name='page']").val() || "unknow";
    let logo = $("input[name='logo']").val() || defaultLogo;

    const $list = $(".insertBeforePoint");
    const $content = $(
      `<a href="${page}" title="${name}"><li><div class="shortcut"><div class="logo"><img height="64" width="64" src="${logo}" alt="${name}"></div><div class="name">${name}</div><div class="del"><svg class="icon-del" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg></div></div></li></a>`
    ).insertBefore($list);
    hide();
    saveToLocal(name, page, logo);
  }

  function deleteSite(siteName) {
    for (const [index, item] of markedWebsites.entries()) {
      console.log(item);
      if (item.name === siteName) {
        markedWebsites.splice(index, 1);
        window.localStorage.setItem(
          "myOwnPages",
          JSON.stringify(markedWebsites)
        );
        break;
      }
    }
  }
  function bindEvents() {
    $(".addNew").on("click", (e) => {
      e.preventDefault();
      $(".addSiteForm").attr("style", "visibility:visible;");
      $(".shade").addClass("fade");
    });

    $(".btn-cancel").on("click", (e) => {
      hide();
    });

    $(".btn-submit").on("click", (e) => {
      mySubmit();
    });

    $(".del").on("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let siteName = e.currentTarget.parentNode.children[1].textContent;
      e.currentTarget.parentNode.parentNode.parentNode.remove();
      deleteSite(siteName);
    });
  }

  function loadLocal() {
    markedWebsites =
      JSON.parse(window.localStorage.getItem("myOwnPages")) || markedWebsites;
  }

  function restoreSites() {
    if (markedWebsites.length != 0) {
      markedWebsites.forEach((item) => {
        const $list = $(".insertBeforePoint");
        const $content = $(
          `<a href="${item.page}" title="${item.name}"><li><div class="shortcut"><div class="logo"><img height="64" width="64" src="${item.logo}" alt="${item.name}"></div><div class="name">${item.name}</div><div class="del"><svg class="icon-del" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg></div></div></li></a>`
        ).insertBefore($list);
      });
    }
  }

  function saveToLocal(name, page, logo) {
    markedWebsites.push({ name: name, page: page, logo: logo });
    window.localStorage.setItem("myOwnPages", JSON.stringify(markedWebsites));
  }

  var init = function () {
    loadLocal();
    restoreSites();
    bindEvents();
  };
  init();
});

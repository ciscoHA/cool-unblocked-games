const pagesData = [
  //{ name: "1v1.lol", NAME MATCHES HTML/PNG    formatted_Name: "1v1.lol", CUSTOM NAME THAT READABLE IN GAME LIST    category: "none",             date: "7-12-2023" ,  DAY MONTH YEAR               release_Date: "25-12-2024" }, DAY MONTH YEAR can be "25-12-2024" or 2024
  {
    name: "2048",
    formatted_Name: "2048",
    category: ["puzzle", "endless"],
    date: "04-01-2024",
    release_Date: "6-03-2014",
    authors: ["Gabriele Cirulli"],
    authorLinks: ["https://github.com/gabrielecirulli"]
  },
  {
    name: "a-dark-room",
    formatted_Name: "A Dark Room",
    category: ["text"],
    date: "04-01-2024",
    release_Date: "10-06-2013",
    authors: ["doublespeak games"],
    authorLinks: ["https://doublespeakgames.com/"]
  },
  {
    name: "age-of-war-2",
    formatted_Name: "Age Of War 2",
    category: ["none"],
    date: "10-01-2024",
    release_Date: "31-05-2010",
    authors: ["Louissi "],
    authorLinks: ["https://louissi.newgrounds.com/"]
  },
  {
    name: "age-of-war",
    formatted_Name: "Age Of War",
    category: ["none"],
    date: "08-01-2024",
    release_Date: "31-10-2007",
    authors: ["Louissi "],
    authorLinks: ["https://louissi.newgrounds.com/"]
  },
  {
    name: "alien-hominid",
    formatted_Name: "Alien Hominid",
    category: ["shooter"],
    date: "29-10-2023",
    release_Date: "7-08-2002",
    authors: ["The Behemoth "],
    authorLinks: ["https://www.thebehemoth.com/"]
  },
  {
    name: "among-us-online",
    formatted_Name: "Among Us Online",
    category: ["online"],
    date: "29-10-2023",
    release_Date: "28-12-2021",
    authors: ["TimMcCool", "InnerSloth"],
    authorLinks: ["https://scratch.mit.edu/users/TimMcCool/", "https://www.innersloth.com/"]
  },
  {
    name: "appel-multiplayer",
    formatted_Name: "Appel Multiplayer",
    category: ["multiplayer", "online", "platformer"],
    date: "15-02-2024",
    release_Date: "25-09-2022",
    authors: ["XShrunk", "Griffpatch"],
    authorLinks: ["https://scratch.mit.edu/users/griffpatch/", ""]
  },
  {
    name: "appel",
    formatted_Name: "Appel",
    category: ["platformer"],
    date: "29-10-2023",
    release_Date: "19-08-2022",
    authors: ["Griffpatch"],
    authorLinks: ["https://scratch.mit.edu/users/griffpatch/"]
  },
  {
    name: "asteroids",
    formatted_Name: "Asteroids",
    category: ["arcade shooter"],
    date: "29-10-2023",
    release_Date: "11-1979",
    authors: ["Neave Interactive", "Atari"],
    authorLinks: ["https://neave.com/", "https://atari.com/"]
  },
  {
    name: "awesome-tanks-2",
    formatted_Name: "Awesome Tanks 2",
    category: ["shooter"],
    date: "01-09-2023",
    release_Date: "30-07-2012",
    authors: ["Alexander Gette", "Jurij Krivonos"],
    authorLinks: ["https://emittercritter.newgrounds.com/", "https://emittercritter.newgrounds.com/"]
  },
  {
    name: "awesome-tanks",
    formatted_Name: "Awesome Tanks",
    category: ["shooter"],
    date: "23-09-2023",
    release_Date: "12-01-2012",
    authors: ["Alexander Gette", "Jurij Krivonos"],
    authorLinks: ["https://emittercritter.newgrounds.com/", "https://emittercritter.newgrounds.com/"]
  },
  {
    name: "bad-piggies",
    formatted_Name: "Bad Piggies",
    category: ["puzzle"],
    date: "05-12-2023",
    release_Date: "27-09-2012",
    authors: ["Rovio"],
    authorLinks: ["https://www.rovio.com/"]
  },
  {
      name: "bitlife",
      formatted_Name: "Bitlife",
      category: ["simulation"],
      date: "17-02-2024",
      release_Date: "29-09-2018",
      authors: ["Candywriter"],
      authorLinks: ["http://www.candywriter.com/"]
    },
    {
      name: "bloons-td-2",
      formatted_Name: "Bloons TD 2",
      category: ["Tower Defence", "Tower Defense"],
      date: "29-10-2023",
      release_Date: "18-10-2007",
      authors: ["Placeholder Author"],
      authorLinks: ["https://www.example.com"]
    },
    {
      name: "bloons-td-3",
      formatted_Name: "Bloons TD 3",
      category: ["Tower Defence", "Tower Defense"],
      date: "10-01-2024",
      release_Date: "02-10-2008",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]
    },
    {
      name: "bloons-td-4-exp",
      formatted_Name: "Bloons TD 4 Expansion",
      category: ["Tower Defence", "Tower Defense"],
      date: "20-10-2023",
      release_Date: "12-07-2010",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]
    },
    {
      name: "bloons-td-4",
      formatted_Name: "Bloons TD 4",
      category: ["Tower Defence", "Tower Defense"],
      date: "10-01-2024",
      release_Date: "26-10-2009",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]
    },
    {
      name: "bloons-td-5",
      formatted_Name: "Bloons TD 5",
      category: ["Tower Defence", "Tower Defense"],
      date: "14-01-2024",
      release_Date: "13-12-2011",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]
    },
    {
      name: "bloons-td",
      formatted_Name: "Bloons TD",
      category: ["Tower Defence", "Tower Defense"],
      date: "10-01-2024",
      release_Date: "16-08-2007",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]    
    },
    {
      name: "bloons",
      formatted_Name: "Bloons",
      category: ["shooter"],
      date: "14-01-2024",
      release_Date: "05-03-2007",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"]    
      },
    {
      name: "bloxorz",
      formatted_Name: "Bloxorz",
      category: ["puzzle block"],
      date: "17-12-2023",
      release_Date: "22-08-2007",
      authors: ["Damien Clarke"],
      authorLinks: ["https://damienclarke.me/"]
    },
    {
      name: "bob-the-robber",
      formatted_Name: "Bob The Robber",
      category: ["puzzle"],
      date: "29-11-2023",
      release_Date: "16-09-2011",
      authors: ["Flazm"],
      authorLinks: ["https://flazm.com/"]
    },
    {
      name: "breaking-the-bank",
      formatted_Name: "Breaking The Bank",
      category: ["none"],
      date: "15-09-2023",
      release_Date: "27-08-2008",
      authors: ["Puffballs United"],
      authorLinks: ["https://puffballsunited.newgrounds.com/"]
    },
    {
      name: "circloo",
      formatted_Name: "Circloo",
      category: ["puzzle"],
      date: "23-11-2023",
      release_Date: "11-11-2014",
      authors: ["Florien van strien"],
      authorLinks: ["https://florianvanstrien.nl/"]
    },
    {
      name: "cloud-platformer-fun",
      formatted_Name: "Cloud Platformer Fun",
      category: ["online", "platformer"],
      date: "29-10-2023",
      release_Date: "12-02-2016",
      authors: ["Griffpatch"],
      authorLinks: ["https://scratch.mit.edu/users/griffpatch/"]
    },
    {
      name: "cookie-clicker",
      formatted_Name: "Cookie Clicker",
      category: ["idle"],
      date: "04-01-2024",
      release_Date: "08-08-2013",
      authors: ["Orteil"],
      authorLinks: ["https://orteil.dashnet.org/"]
    },
    {
      name: "crossy-road",
      formatted_Name: "Crossy Road",
      category: ["endless", "arcade", "mobile", "phone"],
      date: "13-01-2024",
      release_Date: "20-11-2014",
      authors: ["Hipster Whale"],
      authorLinks: ["https://www.hipsterwhale.com/"]
    },
    {
      name: "cut-the-rope",
      formatted_Name: "Cut The Rope",
      category: ["puzzle", "mobile", "phone"],
      date: "03-10-2023",
      release_Date: "08-02-2010",
      authors: ["ZeptoLab"],
      authorLinks: ["https://www.zeptolab.com/"]
    },
    //{ name: "doom",                               formatted_Name: "DOOM",                                              category: "shooter dos demo",             date: "29-10-2023",                               release_Date: "10-12-1993" },
    {
      name: "drift-boss",
      formatted_Name: "Drift Boss",
      category: ["driving"],
      date: "14-01-2024",
      release_Date: "11-2019",
      authors: ["MarketJS"],
      authorLinks: ["https://www.marketjs.com/"]
    },
    {
      name: "drive-mad",
      formatted_Name: "Drive Mad",
      category: ["driving"],
      date: "04-08-2023",
      release_Date: "30-04-2020",
      authors: ["Martin Magni"],
      authorLinks: ["https://martinmagni.com/"]
    },
    {
      name: "duck-life-2",
      formatted_Name: "Duck Life 2",
      category: ["none"],
      date: "29-11-2023",
      release_Date: "10-07-2010",
      authors: ["Duck Life"],
      authorLinks: ["https://games.wixgames.co.uk/"]
    },
    {
      name: "duck-life-3",
      formatted_Name: "Duck Life 3",
      category: ["none"],
      date: "30-06-2023",
      release_Date: "16-05-2011",
      authors: ["Duck Life"],
      authorLinks: ["https://games.wixgames.co.uk/"]
    },
    {
      name: "duck-life-4",
      formatted_Name: "Duck Life 4",
      category: ["none"],
      date: "29-11-2023",
      release_Date: "16-02-2012",
      authors: ["Duck Life"],
      authorLinks: ["https://games.wixgames.co.uk/"]
    },
    {
      name: "duck-life",
      formatted_Name: "Duck Life",
      category: ["none"],
      date: "02-08-2023",
      release_Date: "08-02-2010",
      authors: ["Duck Life"],
      authorLinks: ["https://games.wixgames.co.uk/"]
    },
    {
      name: "earn-to-die-2012",
      formatted_Name: "Earn To Die 2012",
      category: ["none"],
      date: "04-12-2023",
      release_Date: "20-11-2014",
      authors: ["Toffee Games"],
      authorLinks: ["https://www.toffeegames.com/"]
    },
    {
      name: "escaping-the-prison",
      formatted_Name: "Escaping The Prison",
      category: ["none"],
      date: "05-07-2023",
      release_Date: "11-04-2010",
      authors: ["Puffballs United"],
      authorLinks: ["https://puffballsunited.newgrounds.com/"]
    },
    {
      name: "fireboy&watergirl-2",
      formatted_Name: "Fireboy & Watergirl 2",
      category: ["multiplayer", "platformer"],
      date: "03-01-2024",
      release_Date: "26-10-2010",
      authors: ["Oslo Albet and Jan Villanueva"],
      authorLinks: ["https://store.steampowered.com/search/?developer=Oslo%20Albet"]
    },
    {
      name: "fireboy&watergirl-3",
      formatted_Name: "Fireboy & Watergirl 3",
      category: ["multiplayer", "platformer"],
      date: "04-01-2024",
      release_Date: "05-05-2012",
      authors: ["Oslo Albet and Jan Villanueva"],
      authorLinks: ["https://store.steampowered.com/search/?developer=Oslo%20Albet"]
    },
    {
      name: "fireboy&watergirl-4",
      formatted_Name: "Fireboy & Watergirl 4",
      category: ["multiplayer", "platformer"],
      date: "04-01-2024",
      release_Date: "08-03-2013",
      authors: ["Oslo Albet and Jan Villanueva"],
      authorLinks: ["https://store.steampowered.com/search/?developer=Oslo%20Albet"]
    },
    {
      name: "fireboy&watergirl",
      formatted_Name: "Fireboy & Watergirl",
      category: ["multiplayer", "platformer"],
      date: "30-06-2023",
      release_Date: "19-11-2009",
      authors: ["Oslo Albet and Jan Villanueva"],
      authorLinks: ["https://store.steampowered.com/search/?developer=Oslo%20Albet"]
    },
    {
      name: "fishy!",
      formatted_Name: "Fishy!",
      category: ["endless", "survival", "xgen"],
      date: "08-01-2024",
      release_Date: "02-02-2003",
      authors: ["Xgen Studios"],
      authorLinks: ["https://www.xgenstudios.com/"]
    },
    {
      name: "fleeing-the-complex",
      formatted_Name: "Fleeing The Complex",
      category: ["none"],
      date: "19-09-2023",
      release_Date: "12-11-2015",
      authors: ["Puffballs United"],
      authorLinks: ["https://puffballsunited.newgrounds.com/"]
    },
    {
      name: "fnaf-2",
      formatted_Name: "FNAF 2",
      category: ["horror", "five"],
      date: "08-11-2023",
      release_Date: "11-11-2014",
      authors: ["jupal45", "Scott Cawthon"],
      authorLinks: ["https://scratch.mit.edu/users/jupal45/", "https://www.instagram.com/scottcawthon87/"]
    },
    {
      name: "fnaf",
      formatted_Name: "FNAF",
      category: ["horror", "five"],
      date: "29-10-2023",
      release_Date: "08-08-2014",
      authors: ["gustacraft123", "Scott Cawthon"],
      authorLinks: ["https://scratch.mit.edu/users/jupal45/", "https://www.instagram.com/scottcawthon87/"]
    },
    {
      name: "friday-night-funkin",
      formatted_Name: "Friday Night Funkin",
      category: ["music", "rhythm"],
      date: "17-12-2023",
      release_Date: "05-10-2020",
      authors: ["ninjamuffin99"],
      authorLinks: ["https://ninjamuffin99.newgrounds.com/ "]
    },
    {
      name: "getaway-shootout",
      formatted_Name: "Getaway Shootout",
      category: ["multiplayer", "shooter"],
      date: "30-06-2023",
      release_Date: "08-2018",
      authors: ["New Eich Games"],
      authorLinks: ["https://www.neweichgames.com/"]
    },
    {
      name: "gravitee-2",
      formatted_Name: "Gravitee 2",
      category: ["sport", "golf", "space"],
      date: "14-01-2024",
      release_Date: "06-08-2009",
      authors: ["FunkyPear"],
      authorLinks: ["https://www.funkypear.com/"]
    },
    {
      name: "gravitee",
      formatted_Name: "Gravitee",
      category: ["sport", "golf", "space"],
      date: "14-01-2024",
      release_Date: "28-09-2007",
      authors: ["FunkyPear"],
      authorLinks: ["https://www.funkypear.com/"]
    },
    {
      name: "gun-mayhem-2",
      formatted_Name: "Gun Mayhem 2",
      category: ["multiplayer", "shooter", "fighting"],
      date: "17-12-2023",
      release_Date: "30-08-2012",
      authors: ["New Eich Games"],
      authorLinks: ["https://www.neweichgames.com/"]
    },
    {
      name: "gun-mayhem",
      formatted_Name: "Gun Mayhem",
      category: ["multiplayer", "shooter", "fighting"],
      date: "30-06-2023",
      release_Date: "27-06-2011",
      authors: ["New Eich Games"],
      authorLinks: ["https://www.neweichgames.com/"]
    },
    {
      name: "infiltrating-the-airship",
      formatted_Name: "Infiltrating The Airship",
      category: ["none"],
      date: "19-09-2023",
      release_Date: "17-05-2013",
      authors: ["Puffballs United"],
      authorLinks: ["https://puffballsunited.newgrounds.com/"]
    },
    {
      name: "jacksmith",
      formatted_Name: "Jacksmith",
      category: ["none"],
      date: "29-09-2023",
      release_Date: "27-08-2012",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "jelly-truck",
      formatted_Name: "Jelly Truck",
      category: ["driving"],
      date: "09-06-2023",
      release_Date: "11-09-2014",
      authors: ["Gametornado"],
      authorLinks: ["https://gametornado.com/"]
    },
    {
      name: "learn-to-fly-2",
      formatted_Name: "Learn To Fly 2",
      category: ["none"],
      date: "30-08-2023",
      release_Date: "16-06-2011",
      authors: ["Light Bringer Games"],
      authorLinks: ["https://lightbringergames.com/"]
    },
    {
      name: "learn-to-fly",
      formatted_Name: "Learn To Fly",
      category: ["none"],
      date: "25-11-2023",
      release_Date: "16-05-2009",
      authors: ["Light Bringer Games"],
      authorLinks: ["https://lightbringergames.com/"]
    },
    {
      name: "lightbot",
      formatted_Name: "Lightbot",
      category: ["puzzle"],
      date: "14-01-2024",
      release_Date: "11-09-2008",
      authors: ["Coolio Niato"],
      authorLinks: ["https://coolio-niato.newgrounds.com/"]
    },
    {
      name: "line-rider",
      formatted_Name: "Line Rider",
      category: ["puzzle"],
      date: "12-12-2023",
      release_Date: "27-11-2006",
      authors: ["Bostjan Cadez"],
      authorLinks: ["https://www.bostjancadez.art/en"]
    },
    {
      name: "minecraftish-mmo",
      formatted_Name: "Minecraft-ish MMO",
      category: ["none"],
      date: "15-10-2023",
      release_Date: "29-04-2023",
      authors: ["Griffpatch"],
      authorLinks: ["https://scratch.mit.edu/users/griffpatch/"]
    },
    {
      name: "mini-golf-online",
      formatted_Name: "Mini Golf Online",
      category: ["online"],
      date: "14-10-2023",
      release_Date: "02-09-2020",
      authors: ["Stratford James"],
      authorLinks: ["https://scratch.mit.edu/users/StratfordJames/"]
    },
    //{ name: "mini-golf-online-2",                 formatted_Name: "Mini Golf Online 2",                                category: "online",             date: "14-10-2023",                               release_Date: "02-09-2020" },
    {
      name: "moto-x3m-2",
      formatted_Name: "Moto X3M 2",
      category: ["driving"],
      date: "29-06-2023",
      release_Date: "02-2016",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "moto-x3m-3",
      formatted_Name: "Moto X3M 3",
      category: ["driving"],
      date: "29-06-2023",
      release_Date: "22-09-2016",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "moto-x3m-pool-party",
      formatted_Name: "Moto X3M Pool Party",
      category: ["driving"],
      date: "30-06-2023",
      release_Date: "03-2019",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "moto-x3m-spooky-land",
      formatted_Name: "Moto X3M Spooky Land",
      category: ["driving", "Halloween"],
      date: "01-07-2023",
      release_Date: "10-2019",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "moto-x3m-winter",
      formatted_Name: "Moto X3M Winter",
      category: ["driving", "christmas"],
      date: "30-06-2023",
      release_Date: "12-2017",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "moto-x3m",
      formatted_Name: "Moto X3M",
      category: ["driving"],
      date: "28-06-2023",
      release_Date: "08-2015",
      authors: ["MadPuffers"],
      authorLinks: ["http://madpuffers.com/"]
    },
    {
      name: "n",
      formatted_Name: "N",
      category: ["platformer"],
      date: "14-01-2024",
      release_Date: "01-03-2004",
      authors: ["Metanet Software"],
      authorLinks: ["https://www.metanetsoftware.com/"]
    },
    {
      name: "neverball",
      formatted_Name: "Neverball",
      category: ["platformer", "demo"],
      date: "14-12-2023",
      release_Date: "07-2003",
      authors: ["Neverball"],
      authorLinks: ["https://neverball.org/"]
    },
    {
      name: "ovo",
      formatted_Name: "OvO",
      category: ["platformer"],
      date: "13-01-2024",
      release_Date: "21-05-2019",
      authors: ["Dedra Games"],
      authorLinks: ["https://dedragames.com/"]
    },
    {
      name: "pacman",
      formatted_Name: "Pacman",
      category: ["endless"],
      date: "13-01-2024",
      release_Date: "12-1980",
      authors: ["Neave Interactive", "Namco"],
      authorLinks: ["https://neave.com/", "https://www.bandainamcoent.com/"]
    },
    {
      name: "papas-freezeria",
      formatted_Name: "Papa's Freezeria",
      category: ["none"],
      date: "26-10-2023",
      release_Date: "29-10-2013",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "papas-pizzeria",
      formatted_Name: "Papa's Pizzeria",
      category: ["none"],
      date: "10-01-2024",
      release_Date: "12-11-2014",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "plants-vs.-zombies-web-demo",
      formatted_Name: "Plants VS. Zombies",
      category: ["wave tower", "demo"],
      date: "28-11-2023",
      release_Date: "05-05-2009",
      authors: ["PopCap Games"],
      authorLinks: ["https://www.ea.com/en-au/ea-studios/popcap"]
    },
    {
      name: "polytrack",
      formatted_Name: "Polytrack",
      category: ["driving", "racing"],
      date: "13-01-2024",
      "update_Date": "9-12-2024",
      release_Date: "03-2023",
      authors: ["Kodub"],
      authorLinks: ["https://www.kodub.com/"]
    },
    {
      name: "pong",
      formatted_Name: "Pong",
      category: ["none"],
      date: "25-07-2023",
      release_Date: "29-11-1972",
      authors: ["Atari"],
      authorLinks: ["https://www.atari.com"]
    },
    {
      name: "raft-wars",
      formatted_Name: "Raft Wars",
      category: ["worms"],
      date: "26-07-2023",
      release_Date: "31-08-2007",
      authors: ["Martijn Kunst"],
      authorLinks: ["https://www.miniclip.com"]
    },
    {
      name: "retro-bowl",
      formatted_Name: "Retro Bowl",
      category: ["sport", "football", "gridiron", "american"],
      date: "15-09-2023",
      release_Date: "01-2020",
      authors: ["New Star Games"],
      authorLinks: ["https://www.newstargames.com"]
    },
    {
      name: "rooftop-snipers",
      formatted_Name: "Rooftop Snipers",
      category: ["multiplayer", "shooter", "fighting"],
      date: "05-07-2023",
      release_Date: "06-2017",
      authors: ["New Eich Games"],
      authorLinks: ["https://neweichgames.com/"]
    },
    {
      name: "run-2",
      formatted_Name: "Run 2",
      category: ["platformer", "endless", "runner"],
      date: "02-12-2023",
      release_Date: "27-03-2011",
      authors: ["player_03"],
      authorLinks: ["https://player03.com"]
    },
    {
      name: "run-3",
      formatted_Name: "Run 3",
      category: ["platformer", "endless", "runner"],
      date: "15-06-2023",
      release_Date: "05-06-2014",
      authors: ["player_03"],
      authorLinks: ["https://player03.com"]
    },
    {
      name: "slither.io-online",
      formatted_Name: "Slither.io Online",
      category: ["online"],
      date: "21-10-2023",
      release_Date: "24-05-2019",
      authors: ["Griffpatch", "Steve Howse"],
      authorLinks: ["https://scratch.mit.edu/users/griffpatch/", "http://slither.io"]
    },
    {
      name: "slope",
      formatted_Name: "Slope",
      category: ["endless"],
      date: "28-11-2023",
      release_Date: "30-09-2014",
      authors: ["Rob Kay"],
      authorLinks: ["https://www.y8.com"]
    },
    {
      name: "snow-rider-3d",
      formatted_Name: "Snow Rider 3D",
      category: ["endless", "platformer", "christmas", "3D"],
      date: "09-11-2023",
      release_Date: "11-2020",
      authors: ["GemGamer studio"],
      authorLinks: ["#"]
    },
  {
      name: "stack",
      formatted_Name: "Stack",
      category: ["puzzle", "endless"],
      date: "08-09-2023",
      release_Date: "17-02-2016",
      authors: ["Playcalm"],
      authorLinks: ["https://playcalm.co/"]
    },
    {
      name: "stealing-the-diamond",
      formatted_Name: "Stealing The Diamond",
      category: ["adventure", "choose"],
      date: "09-09-2023",
      release_Date: "08-07-2011",
      authors: ["Puffballs United"],
      authorLinks: ["https://puffballsunited.newgrounds.com/"]
    },
    {
      name: "stickman-hook",
      formatted_Name: "Stickman Hook",
      category: ["platformer", "endless"],
      date: "13-01-2024",
      release_Date: "02-10-2018",
      authors: ["Madbox"],
      authorLinks: ["https://madbox.io/"]
    },
    {
      name: "subway-surfers",
      formatted_Name: "Subway Surfers",
      category: ["platformer", "endless", "runner"],
      date: "17-12-2023",
      release_Date: "23-05-2012",
      authors: ["SYBO Games, Kiloo"],
      authorLinks: ["https://sybogames.com/"]
    },
    {
      name: "super-mario-63",
      formatted_Name: "Super Mario 63",
      category: ["platformer", "nintendo"],
      date: "08-01-2024",
      release_Date: "10-06-2009",
      authors: ["Runuow"],
      authorLinks: ["https://runouw.newgrounds.com/"]
    },
    {
      name: "super-smash-flash",
      formatted_Name: "Super Smash Flash",
      category: ["fighting", "mario", "nintendo"],
      date: "13-01-2024",
      release_Date: "21-08-2006",
      authors: ["McLeodGaming"],
      authorLinks: ["https://www.mcleodgaming.com/"]
    },
    {
      name: "tanuki-sunset",
      formatted_Name: "Tanuki Sunset",
      category: ["endless"],
      date: "09-08-2023",
      release_Date: "15-10-2019",
      authors: ["Rewind Games"],
      authorLinks: ["https://rewindgames.ca/"]
    },
    {
      name: "temple-run-2",
      formatted_Name: "Temple Run 2",
      category: ["platformer", "endless", "runner"],
      date: "02-12-2023",
      release_Date: "16-01-2013",
      authors: ["Imangi Studios"],
      authorLinks: ["https://imangistudios.com/"]
    },
          {
        name: "tennis-physics",
        formatted_Name: "Tennis Physics",
        category: ["multiplayer"],
        date: "17-12-2023",
        release_Date: "26-05-2022",
        authors: ["TwoPlayerGames"],
        authorLinks: ["http://twoplayergames.org/"]
      },
      {
        name: "the-fancy-pants-adventures-remix",
        formatted_Name: "Fancy Pants Remix",
        category: ["platformer"],
        date: "09-11-2023",
        release_Date: "06-11-2014",
        authors: ["Borne Games"],
        authorLinks: ["https://www.bornegames.com/"]
      },
      {
        name: "the-fancy-pants-adventures-world-2",
        formatted_Name: "Fancy Pants World 2",
        category: ["platformer"],
        date: "26-09-2023",
        release_Date: "09-01-2008",
        authors: ["Borne Games"],
        authorLinks: ["https://www.bornegames.com/"]
      },
      {
        name: "the-fancy-pants-adventures-world-3",
        formatted_Name: "Fancy Pants World 3",
        category: ["platformer"],
        date: "26-09-2023",
        release_Date: "05-04-2012",
        authors: ["Borne Games"],
        authorLinks: ["https://www.bornegames.com/"]
      },
      {
        name: "the-fancy-pants-adventures",
        formatted_Name: "Fancy Pants Adventures",
        category: ["platformer"],
        date: "25-09-2023",
        release_Date: "14-03-2006",
        authors: ["Borne Games"],
        authorLinks: ["https://www.bornegames.com/"]
      },
      {
        name: "fancy-snowboarding",
        formatted_Name: "Fancy Snowboarding",
        category: ["puzzle"],
        date: "27-09-2023",
        release_Date: "09-01-2015",
        authors: ["Borne Games"],
        authorLinks: ["https://www.bornegames.com/"]
      },
      {
        name: "the-final-earth-2",
        formatted_Name: "The Final Earth 2",
        category: ["building"],
        date: "14-01-2024",
        release_Date: "13-06-2019",
        authors: ["Florien van Strien"],
        authorLinks: ["https://florianvanstrien.nl/"]
      },
      {
        name: "the-worlds-hardest-game-2",
        formatted_Name: "World's Hardest Game 2",
        category: ["platformer", "impossible"],
        date: "05-10-2023",
        release_Date: "01-08-2008",
        authors: ["Snubby"],
        authorLinks: ["https://snubby.newgrounds.com/"]
      },
      {
        name: "the-worlds-hardest-game",
        formatted_Name: "World's Hardest Game",
        category: ["platformer", "impossible"],
        date: "04-10-2023",
        release_Date: "20-03-2008",
        authors: ["Snubby"],
        authorLinks: ["https://snubby.newgrounds.com/"]
      },
      {
        name: "tiny-fishing",
        formatted_Name: "Tiny Fishing",
        category: ["endless", "afk", "idle"],
        date: "04-01-2024",
        release_Date: "09-2020",
        authors: ["Playcalm"],
        authorLinks: ["https://playcalm.co/"]
      },    
      {
        name: "tomb-of-the-mask",
        formatted_Name: "Tomb of The Mask",
        category: ["puzzle", "mobile", "phone"],
        date: "26-06-2023",
        release_Date: "09-02-2016",
        authors: ["Happymagenta UAB"],
        authorLinks: ["https://happymagenta.com/"]
      },
      {
        name: "unfair-mario",
        formatted_Name: "Unfair Mario",
        category: ["puzzle", "nintendo"],
        date: "13-01-2024",
        release_Date: "30-12-2010",
        authors: ["GameItNow.com"],
        authorLinks: ["https://www.gameitnow.com/"]
      },
      {
        name: "merge-melon",
        formatted_Name: "Merge Melon Suika Game",
        category: ["puzzle", "endless", "suika", "watermelon"],
        date: "13-10-2023",
        release_Date: "2021",
        authors: ["Aladdin X", "Wesane.com"],
        authorLinks: ["https://www.ign.com/games/producer/aladdin-x", "https://www.wesane.com/"]
      },
      {
        name: "vex-3",
        formatted_Name: "Vex 3",
        category: ["platformer"],
        date: "26-03-2024",
        release_Date: "08-2014",
        authors: ["Amazing Adam"],
        authorLinks: ["https://www.indiedb.com/company/amazing-adam"]
      },
      {
        name: "paper.io-2",
        formatted_Name: "Paper.io 2",
        category: ["mobile"],
        date: "26-03-2024",
        release_Date: "08-08-2018",
        authors: ["Voodoo"],
        authorLinks: ["https://www.voodoo.io/games/"]
      },
      {
        name: "johnny-upgrade",
        formatted_Name: "Johnny Upgrade",
        category: ["platformer"],
        date: "26-03-2024",
        release_Date: "13-04-2012",
        authors: ["Gameshot"],
        authorLinks: ["https://www.gameshot.org/"]
      },
      {
        name: "eggy-car",
        formatted_Name: "Eggy Car",
        category: ["driving", "endless"],
        date: "26-03-2024",
        release_Date: "07-2022",
        authors: ["Beedo Games"],
        authorLinks: ["https://beedogames.com/"]
      },
      {
        name: "bob-the-robber-2",
        formatted_Name: "Bob The Robber 2",
        category: ["puzzle", "stealth"],
        date: "26-03-2024",
        release_Date: "24-04-2012",
        authors: ["Flazm"],
        authorLinks: ["https://flazm.com/"]
      },
      {
        name: "n-gon",
        formatted_Name: "n-gon",
        category: ["platformer", "science", "shooter", "platformer"],
        date: "09-08-2024",
        release_Date: "07-07-2019",
        authors: ["Landgreen"],
        authorLinks: ["https://github.com/landgreen"]
      },
      {
        name: "basket-random",
        formatted_Name: "Basket Random",
        category: ["multiplayer", "sport"],
        date: "09-08-2024",
        release_Date: "21-04-2020",
        authors: ["TwoPlayerGames"],
        authorLinks: ["https://twoplayergames.org"]
      },
      {
        name: "hextris",
        formatted_Name: "Hextris",
        category: ["puzzle", "endless", "tetris"],
        date: "09-08-2024",
        release_Date: "11-05-2014",
        authors: ["lengstrom"],
        authorLinks: ["https://github.com/Hextris/hextris"]
      },
      {
        name: "jstetris",
        formatted_Name: "Jstetris",
        category: ["puzzle", "endless", "tetris"],
        date: "09-08-2024",
        release_Date: "2004",
        authors: ["Czarek Tomczak", "Alexey Pajitnov"],
        authorLinks: ["https://github.com/cztomczak"]
      },
      {
        name: "quake-3-arena-demo",
        formatted_Name: "Quake 3 Arena Demo",
        category: ["shooter", "demo"],
        date: "09-08-2024",
        release_Date: "02-12-1999",
        authors: ["lrusso", "id Software"],
        authorLinks: ["https://github.com/lrusso", "https://www.idsoftware.com/en"]
      },
      {
        name: "there-is-no-game",
        formatted_Name: "There Is No Game",
        category: ["puzzle"],
        date: "09-08-2024",
        release_Date: "25-06-2015",
        authors: ["Draw Me A Pixel"],
        authorLinks: ["https://drawmeapixel.com/"]
      },
      {
        name: "time-shooter-2",
        formatted_Name: "Time Shooter 2",
        category: ["shooter", "time"],
        date: "09-08-2024",
        release_Date: "03-2022",
        authors: ["GoGoMan"],
        authorLinks: ["https://www.y8.com/studios/gogoman"]
      },
      {
        name: "time-shooter-3-swat",
        formatted_Name: "Time Shooter 3: SWAT",
        category: ["shooter", "time"],
        date: "09-08-2024",
        release_Date: "03-2022",
        authors: ["GoGoMan"],
        authorLinks: ["https://www.y8.com/studios/gogoman"]
      },
      {
        name: "abobos-big-adventure",
        formatted_Name: "Abobos Big Adventure",
        category: ["arcade", "nintendo"],
        date: "09-08-2024",
        release_Date: "11-01-2012",
        authors: ["Team Bobo"],
        authorLinks: ["https://www.ign.com/games/producer/team-bobo"]
      },
      {
        name: "cactus-mccoy",
        formatted_Name: "Cactus Mccoy",
        category: ["platformer", "papa"],
        date: "09-08-2024",
        release_Date: "10-03-2011",
        authors: ["Flipline Studios"],
        authorLinks: ["https://www.flipline.com/"]
      },
      {
        name: "cactus-mccoy-2",
        formatted_Name: "Cactus Mccoy 2",
        category: ["platformer", "papa"],
        date: "09-08-2024",
        release_Date: "06-10-2011",
        authors: ["Flipline Studios"],
        authorLinks: ["https://www.flipline.com/"]
      },
      {
        name: "douchebag-life",
        formatted_Name: "Douchebag Life",
        category: ["none"],
        date: "09-08-2024",
        release_Date: "30-06-2011",
        authors: ["PopBrain"],
        authorLinks: ["https://popbrain.newgrounds.com/"]
      },
      {
        name: "douchebag-workout-2",
        formatted_Name: "Douchebag Workout 2",
        category: ["none"],
        date: "09-08-2024",
        release_Date: "10-04-2013",
        authors: ["PopBrain"],
        authorLinks: ["https://popbrain.newgrounds.com/"]
      },
    {
      name: "floodrunner-4",
      formatted_Name: "Floodrunner 4",
      category: ["platformer", "endless"],
      date: "09-08-2024",
      release_Date: "03-08-2012",
      authors: ["Bryan Devlin"],
      authorLinks: ["https://x.com/thebenrad"]
    },
    {
      name: "learn-to-fly-3",
      formatted_Name: "Learn To Fly 3",
      category: ["penguin"],
      date: "09-08-2024",
      release_Date: "19-02-2016",
      authors: ["Light Bringer Games"],
      authorLinks: ["http://lightbringergames.com/"]
    },
    {
      name: "papa-louie-2",
      formatted_Name: "Papa Louie 2",
      category: ["platformer"],
      date: "09-08-2024",
      release_Date: "05-06-2013",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "papa-louie-3",
      formatted_Name: "Papa Louie 3",
      category: ["platformer"],
      date: "09-08-2024",
      release_Date: "04-03-2015",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "papa-louie-when-pizzas-attack",
      formatted_Name: "Papa Louie 1",
      category: ["platformer"],
      date: "09-08-2024",
      release_Date: "09-11-2006",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "papas-cheeseria",
      formatted_Name: "Papa's Cheeseria",
      category: ["none"],
      date: "09-08-2024",
      release_Date: "10-06-2015",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "papas-scooperia",
      formatted_Name: "Papa's Scooperia",
      category: ["none"],
      date: "09-08-2024",
      release_Date: "24-07-2018",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "portal-the-flash-version",
      formatted_Name: "Portal The Flash Version",
      category: ["puzzle"],
      date: "09-08-2024",
      release_Date: "09-10-2007",
      authors: ["We Create Stuff"],
      authorLinks: ["https://wecreatestuff.com/", "https://www.valvesoftware.com/en/"]
    },
    {
      name: "raft-wars-2",
      formatted_Name: "Raft Wars 2",
      category: ["worms", "battle"],
      date: "09-08-2024",
      release_Date: "03-2013",
      authors: ["Martijn Kunst"],
      authorLinks: ["https://www.miniclip.com"]
    },
    {
      name: "the-impossible-quiz",
      formatted_Name: "The Impossible Quiz",
      category: ["puzzle"],
      date: "09-08-2024",
      release_Date: "20-02-2007",
      authors: ["Splapp-me-do"],
      authorLinks: ["https://splapp-me-do.newgrounds.com/"]
    },
    {
      name: "8-ball-pool",
      formatted_Name: "8 Ball Pool",
      category: ["multiplayer", "sport"],
      date: "09-08-2024",
      release_Date: "14-07-2021",
      authors: ["Coltroc", "Miniclip"],
      authorLinks: ["https://scratch.mit.edu/users/Coltroc/", "https://www.miniclip.com/"]
    },
    {
      name: "60-seconds-burger-run",
      formatted_Name: "60 Seconds Burger Run",
      category: ["platformer"],
      date: "16-08-2024",
      release_Date: "17-06-2012",
      authors: ["gameshot"],
      authorLinks: ["https://www.gameshot.org/"]
    },
    {
      name: "60-seconds-santa-run",
      formatted_Name: "60 Seconds Santa Run",
      category: ["platformer", "christmas"],
      date: "16-08-2024",
      release_Date: "04-12-2012",
      authors: ["gameshot"],
      authorLinks: ["https://www.gameshot.org/"]
    },
    {
      name: "santa-run-2",
      formatted_Name: "Santa Run 2",
      category: ["platformer", "christmas"],
      date: "16-08-2024",
      release_Date: "12-2013",
      authors: ["gameshot"],
      authorLinks: ["https://www.gameshot.org/"]
    },
    {
      name: "santa-run-3",
      formatted_Name: "Santa Run 3",
      category: ["platformer", "christmas"],
      date: "16-08-2024",
      release_Date: "12-2015",
      authors: ["gameshot"],
      authorLinks: ["https://www.gameshot.org/"]
    },
    {
      name: "santa-run-extrahard-version",
      formatted_Name: "Santa Run Extrahard Vers.",
      category: ["platformer", "christmas"],
      date: "16-08-2024",
      release_Date: "12-2012",
      authors: ["gameshot"],
      authorLinks: ["https://www.gameshot.org/"]
    },
    {
      name: "bloons-player-pack-2",
      formatted_Name: "Bloons Player Pack 2",
      category: ["shooter", "puzzle"],
      date: "16-08-2024",
      release_Date: "26-09-2007",
      authors: ["Ninja Kiwi"],
      authorLinks: ["https://ninjakiwi.com/"] 
    },
    {
      name: "hamu",
      formatted_Name: "Hamu",
      category: ["puzzle", "brick breaker"],
      date: "16-08-2024",
      release_Date: "06-04-2006",
      authors: ["ThinXIII"],
      authorLinks: ["https://thinxiii.newgrounds.com/"]
    },
    {
      name: "vex-4",
      formatted_Name: "Vex 4",
      category: ["platformer"],
      date: "16-08-2024",
      release_Date: "2018",
      authors: ["Amazing Adam"],
      authorLinks: ["https://www.indiedb.com/company/amazing-adam"]
    },
    {
      name: "yongjin-brick-breaker",
      formatted_Name: "Yongjin Brick Breaker",
      category: ["puzzle", "endless"],
      date: "16-08-2024",
      release_Date: "10-05-2020",
      authors: ["16Yongjin"],
      authorLinks: ["https://github.com/16Yongjin"]
    },
    {
      name: "js-dos",
      formatted_Name: "JS-DOS Emulator",
      category: ["emulator"],
      date: "04-09-2024",
      release_Date: "2010",
      authors: ["js-dos/caiiiycuk", "IBM", "Microsoft"],
      authorLinks: ["https://github.com/caiiiycuk", "https://www.ibm.com", "https://www.microsoft.com"]
    },
    {
      name: "doom-marines-best-friend",
      formatted_Name: "DOOM Marine's Best Friend",
      category: ["shooter", "demo"],
      date: "04-09-2024",
      release_Date: "10-12-1993",
      authors: ["id Software", "Romero Games", "caiiycuk", "Lee Killough", "Sakitoshi"],
      authorLinks: ["https://www.idsoftware.com/", "https://romero.com/sigil", "https://github.com/caiiiycuk", "", ""]
    },
    {
      name: "heretic",
      formatted_Name: "Heretic",
      category: ["online", "shooter", "doom", "demo"],
      date: "04-09-2024",
      release_Date: "23-12-1994",
      authors: ["Raven Software", "id Software", "caiiiycuk"],
      authorLinks: ["https://www.ravensoftware.com/", "https://www.idsoftware.com/", "https://github.com/caiiiycuk"]
    },
    {
      name: "wolfenstein-3d",
      formatted_Name: "Wolfenstein 3D",
      category: ["shooter", "doom", "demo"],
      date: "04-09-2024",
      release_Date: "05-05-1992",
      authors: ["id Software"],
      authorLinks: ["https://www.idsoftware.com"]
    },
    {
      name: "tunnel-rush",
      formatted_Name: "Tunnel Rush",
      category: ["endless"],
      date: "04-09-2024",
      release_Date: "2018",
      authors: ["Deer Cat Games"],
      authorLinks: ["http://www.deercatgames.com/"]
    },
    {
      name: "connect-4",
      formatted_Name: "Connect 4",
      category: ["online", "puzzle"],
      date: "04-09-2024",
      release_Date: "15-08-2020",
      authors: ["TimMcCool", "Hasbro"],
      authorLinks: ["https://scratch.mit.edu/users/TimMcCool/", "https://shop.hasbro.com/"]
    },
    {
      name: "sigil-1&2",
      formatted_Name: "Sigil 1 & 2",
      category: ["shooter", "doom"],
      date: "09-09-2024",
      release_Date: "10-12-2023",
      authors: ["Romero Games", "id Software", "caiiycuk"],
      authorLinks: ["https://romero.com/sigil", "https://www.idsoftware.com/", "https://github.com/caiiiycuk"]
    },
    {
      name: "army-of-ages",
      formatted_Name: "Army Of Ages",
      category: ["age"],
      date: "09-09-2024",
      release_Date: "2011",
      authors: ["Louissi", "Mapoga"],
      authorLinks: ["https://louissi.newgrounds.com/", "#"]
    },
    {
      name: "papas-pancakeria",
      formatted_Name: "Papa's Pancakeria",
      category: ["none"],
      date: "09-09-2024",
      release_Date: "05-03-2012",
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    {
      name: "the-impossible-quiz-2",
      formatted_Name: "The Impossible Quiz 2",
      category: ["puzzle"],
      date: "09-09-2024",
      release_Date: "30-08-2007",
      authors: ["Splapp-me-do"],
      authorLinks: ["https://splapp-me-do.newgrounds.com/"]
    },
    {
      name: "circloo-2",
      formatted_Name: "Circloo 2",
      category: ["puzzle", "platformer"],
      date: "17-09-2024",
      release_Date: "30-05-2018",
      authors: ["Florien van strien"],
      authorLinks: ["https://florianvanstrien.nl/"]
    },
    {
      name: "doodle-jump",
      formatted_Name: "Doodle Jump",
      category: ["endless", "platformer"],
      date: "17-09-2024",
      release_Date: "15-03-2009",
      authors: ["Lima Sky"],
      authorLinks: ["https://www.limasky.com/"]
    },
    {
      name: "recoil",
      formatted_Name: "Recoil",
      category: ["shooter", "puzzle"],
      date: "17-09-2024",
      release_Date: "30-04-2020",
      authors: ["Martin Magni"],
      authorLinks: ["https://martinmagni.com/"]
    },
    {
      name: "soccer-random",
      formatted_Name: "Soccer Random",
      category: ["multiplayer", "sport", "football"],
      date: "17-09-2024",
      release_Date: "28-02-2020",
      authors: ["TwoPlayerGames"],
      authorLinks: ["https://twoplayergames.org"]
    },    
    { 
      name: "vex-5", 
      formatted_Name: "Vex 5", 
      category: ["platformer",], 
      date: "17-09-2024", 
      release_Date: "2021",
      authors: ["Amazing Adam"], 
      authorLinks: ["https://www.indiedb.com/company/amazing-adam"] 
    },
    { 
      name: "tube-jumpers", 
      formatted_Name: "Tube Jumpers", 
      category: ["multiplayer", "beach",], 
      date: "17-09-2024", 
      release_Date: "06-2016",
      authors: ["New Eich Games"], 
      authorLinks: ["https://neweichgames.com/"] 
    },
    { 
      name: "mini-metro-london", 
      formatted_Name: "Mini Metro", 
      category: ["puzzle", "endless", "demo"], 
      date: "12-10-2024", 
      release_Date: "11-08-2014", 
      authors: ["Dinosaur Polo Club"], 
      authorLinks: ["https://dinopoloclub.com/"] 
    },
    
    { 
      name: "moschess", 
      formatted_Name: "MosChess", 
      category: ["puzzle", "online", "chess", "board"], 
      date: "12-10-2024", 
      release_Date: "26-01-2024", 
      authors: ["SpartanDav"], 
      authorLinks: ["https://scratch.mit.edu/users/SpartanDav/"] 
    },
    
    { 
      name: "osu-full-remake", 
      formatted_Name: "Osu! Full Remake", 
      category: ["music", "rhythm"], 
      date: "12-10-2024", 
      release_Date: "30-12-2021", 
      authors: ["SpiritSK", "Dean Herbert"], 
      authorLinks: ["https://scratch.mit.edu/users/SpiritSK/", "https://osu.ppy.sh/"] 
    },
    
    { 
      name: "submersible", 
      formatted_Name: "Submersible", 
      category: ["submarine", "water", "underwater"], 
      date: "12-10-2024", 
      release_Date: "07-03-2023", 
      authors: ["awesome-llama"], 
      authorLinks: ["https://scratch.mit.edu/users/awesome-llama/"] 
    },
    
    { 
      name: "tetris-flash", 
      formatted_Name: "Flash Tetris", 
      category: ["puzzle", "endless", "tetris"], 
      date: "12-10-2024", 
      release_Date: "06-06-1984", 
      authors: ["Neave Interactive", "Alexey Pajitnov"], 
      authorLinks: ["https://neave.com/", ""] 
    },
    
    { 
      name: "boxel-rebound", 
      formatted_Name: "Boxel Rebound", 
      category: ["platformer"], 
      date: "29-10-2024", 
      release_Date: "21-04-2017", 
      authors: ["Jacob DeBenedetto"], 
      authorLinks: ["https://www.dopplercreative.com/"] 
    },
    
    { 
      name: "superhot-prototype", 
      formatted_Name: "SUPERHOT Prototype", 
      category: ["shooter", "time"], 
      date: "29-10-2024", 
      release_Date: "09-2013", 
      authors: ["Superhot Team"], 
      authorLinks: ["https://superhotgame.com/"] 
    },
    
    { 
      name: "vex-6", 
      formatted_Name: "Vex 6", 
      category: ["platformer"], 
      date: "29-10-2024", 
      release_Date: "2021", 
      authors: ["Amazing Adam"], 
      authorLinks: ["https://www.indiedb.com/company/amazing-adam"] 
    },
    
    { 
      name: "vex-7", 
      formatted_Name: "Vex 7", 
      category: ["platformer"], 
      date: "29-10-2024", 
      release_Date: "2022", 
      authors: ["Amazing Adam"], 
      authorLinks: ["https://www.indiedb.com/company/amazing-adam"] 
    },
    
    { 
      name: "burrito-bison", 
      formatted_Name: "Burrito Bison", 
      category: ["endless"], 
      date: "29-10-2024", 
      release_Date: "17-02-2011", 
      authors: ["Juicy Beast"], 
      authorLinks: ["https://juicybeast.com/"] 
    },
    
    { 
      name: "floodrunner-2", 
      formatted_Name: "Floodrunner 2", 
      category: ["platformer", "endless"], 
      date: "29-10-2024", 
      release_Date: "2007", 
      authors: ["Bryan Devlin"], 
      authorLinks: ["https://x.com/thebenrad"] 
    },
    
    { 
      name: "gun-mayhem-redux", 
      formatted_Name: "Gun Mayhem Redux", 
      category: ["multiplayer", "shooter", "fighting"], 
      date: "29-10-2024", 
      release_Date: "12-2014", 
      authors: ["Kevin Gu"], 
      authorLinks: ["https://www.thekevingu.com/"] 
    },
    
    { 
      name: "my-friend-pedro", 
      formatted_Name: "My Friend Pedro", 
      category: ["platformer", "shooter", "demo"], 
      date: "29-10-2024", 
      release_Date: "16-06-2014", 
      authors: ["DeadToast Entertainment"], 
      authorLinks: ["https://www.deadtoast.com/"] 
    },
    
    { 
      name: "papas-sushiria", 
      formatted_Name: "Papa's Sushiria", 
      category: ["none"], 
      date: "29-10-2024", 
      release_Date: "13-12-2016", 
      authors: ["Flipline Studios"],
      authorLinks: ["https://www.flipline.com/"]
    },
    
    { 
      name: "powerpuff-girls-zom-b-gone", 
      formatted_Name: "Powerpuff Girls Zom-B-Gone", 
      category: ["cartoon", "endless"], 
      date: "29-10-2024", 
      release_Date: "2004", 
      authors: ["Powerpuff Girls", "Cartoon Network"], 
      authorLinks: ["https://en.wikipedia.org/wiki/The_Powerpuff_Girls", "https://www.cartoonnetwork.ca/"] 
    },
    
    { 
      name: "redball-2", 
      formatted_Name: "Red Ball 2", 
      category: ["platformer"], 
      date: "29-10-2024", 
      release_Date: "2009", 
      authors: ["Evgeniy Fedoseev"], 
      authorLinks: ["https://redball.fandom.com/wiki/Eugine_Fedossev"] 
    },
    
    { 
      name: "run", 
      formatted_Name: "run.", 
      category: ["platformer", "1"], 
      date: "29-10-2024", 
      release_Date: "21-03-2011", 
      authors: ["player_03"], 
      authorLinks: ["https://player03.com/"] 
    },
    
    { 
      name: "the-impossible-quiz-book", 
      formatted_Name: "The Impossible Quiz Book", 
      category: ["puzzle"], 
      date: "29-10-2024", 
      release_Date: "14-08-2009", 
      authors: ["Splapp-me-do"], 
      authorLinks: ["https://splapp-me-do.newgrounds.com/"] 
    },
    { 
  name: "1v1.lol", 
  formatted_Name: "1v1.lol", 
  category: ["shooter", "online", "fortnite"], 
  date: "15-11-2024", 
  release_Date: "2019", 
  authors: ["JustPlay.LOL"], 
  authorLinks: ["https://www.justplay.lol/"]
}, 

{ 
  name: "bob-the-robber-4", 
  formatted_Name: "Bob the Robber 4", 
  category: ["puzzle"], 
  date: "15-11-2024", 
  release_Date: "27-07-2017", 
  authors: ["Flazm"],
  authorLinks: ["https://flazm.com/"]
}, 

{ 
  name: "boxing-random", 
  formatted_Name: "Boxing Random", 
  category: ["multiplayer", "sport"], 
  date: "15-11-2024", 
  release_Date: "05-2021", 
  authors: ["TwoPlayer Games"], 
  authorLinks: ["http://twoplayergames.org/"]
}, 

{ 
  name: "little-alchemy-2", 
  formatted_Name: "Little Alchemy 2", 
  category: ["puzzle", "craft", "infinite craft"], 
  date: "15-11-2024", 
  release_Date: "23-08-2017", 
  authors: ["Recloak Games, Jakub Koziol"], 
  authorLinks: ["https://recloak.com/"]
}, 

{ 
  name: "vex-8", 
  formatted_Name: "Vex 8", 
  category: ["platformer"], 
  date: "15-11-2024", 
  release_Date: "2023", 
  authors: ["Amazing Adam"], 
  authorLinks: ["https://www.indiedb.com/company/amazing-adam"]
}, 

{ 
  name: "burrito-bison-revenge", 
  formatted_Name: "Burrito Bison Revenge", 
  category: ["endless", "2"], 
  date: "15-11-2024", 
  release_Date: "27-02-2012", 
  authors: ["Juicy Beast"], 
  authorLinks: ["https://juicybeast.com/"]
}, 

{ 
  name: "block-blast", 
  formatted_Name: "Block Blast", 
  category: ["puzzle"], 
  date: "25-11-2024", 
  release_Date: "04-05-2022", 
  authors: ["reunbozdo", "tripledot", "Hungry Studio"], 
  authorLinks: ["https://github.com/reunbozdo/reunbozdo.github.io", "https://tripledotstudios.com/", "https://hungrystudio.com/"]
}, 

{ 
  name: "madalin-stunt-cars-2", 
  formatted_Name: "Madalin Stunt Cars 2", 
  category: ["driving", "physics"], 
  date: "25-11-2024", 
  release_Date: "06-2015", 
  authors: ["Madalin Games"], 
  authorLinks: ["https://www.madalingames.com/"]
}, 

{ 
  name: "retro-bowl-college", 
  formatted_Name: "Retro Bowl College", 
  category: ["sport", "football", "gridiron", "american", "school"], 
  date: "25-11-2024", 
  release_Date: "18-09-2023", 
  authors: ["New Star Games"], 
  authorLinks: ["https://www.newstargames.com/"]
}, 

{ 
  name: "sandtris", 
  formatted_Name: "Sandtris", 
  category: ["puzzle", "endless", "tetris", "setris", "physics"], 
  date: "25-11-2024", 
  release_Date: "2023", 
  authors: ["Franco Miranda", "Mslivo", "Alexey Pajitnov"], 
  authorLinks: ["https://francomiranda.com/", "https://mslivo.itch.io/", ""]
}, 

{ 
  name: "burrito-bison-launcha-libre", 
  formatted_Name: "Burrito Bison Launcha Libre", 
  category: ["endless", "3"], 
  date: "09-12-2024", 
  update_Date: "31-01-2025", 
  release_Date: "07-09-2016", 
  authors: ["Juicy Beast"], 
  authorLinks: ["https://juicybeast.com/"]
}, 

{ 
  name: "choppy-orc-autosplitter", 
  formatted_Name: "Choppy Orc Autosplitter", 
  category: ["speedrun", "platformer"], 
  date: "09-12-2024", 
  release_Date: "27-09-2018", 
  authors: ["eddynardo", "or321"], 
  authorLinks: ["https://eddynardo.com/games/", "https://github.com/or321/choppy-orc-autosplitter"]
}, 

{ 
  name: "cut-the-rope-time-travel", 
  formatted_Name: "Cut the Rope Time Travel", 
  category: ["puzzle", "mobile", "phone"], 
  date: "09-12-2024", 
  release_Date: "18-04-2013", 
  authors: ["ZeptoLab"], 
  authorLinks: ["https://www.zeptolab.com/"]
}, 

{ 
  name: "stick-rpg", 
  formatted_Name: "Stick RPG Complete", 
  category: ["rpg", "gambling", "xgen"], 
  date: "09-12-2024", 
  release_Date: "28-03-2005", 
  authors: ["XGen Studios"], 
  authorLinks: ["https://www.xgenstudios.com/"]
}, 

{ 
  name: "swords-and-souls", 
  formatted_Name: "Swords and Souls", 
  category: ["rpg", "fighting"], 
  date: "09-12-2024", 
  release_Date: "18-10-2015", 
  authors: ["SoulGame Studio"], 
  authorLinks: ["https://soulgamestudio.com/"]
}, 

{ 
  name: "motherload", 
  formatted_Name: "Motherload", 
  category: ["mining", "dig", "xgen"], 
  date: "16-12-2024", 
  release_Date: "29-09-2004", 
  authors: ["XGen Studios"], 
  authorLinks: ["https://www.xgenstudios.com/"]
}, 

{ 
  name: "swords-and-sandals", 
  formatted_Name: "Swords and Sandals", 
  category: ["fighting", "turn", "strategy"], 
  date: "16-12-2024", 
  release_Date: "2005", 
  authors: ["Whiskeybarrel Studios"], 
  authorLinks: ["http://whiskeybarrelstudios.com/"]
},
  //01/31/2025
  { 
    name: "awesome-planes", 
    formatted_Name: "Awesome Planes", 
    category: ["shooter", "flight", "flying", "driving"], 
    date: "31-01-2025", 
    release_Date: "04-18-2012",
    authors: ["Alexander Gette", "Jurij Krivonos"],
    authorLinks: ["https://emittercritter.newgrounds.com/", "https://emittercritter.newgrounds.com/"]
  },
  { 
    name: "bloons-player-pack-3", 
    formatted_Name: "Bloons Player Pack 3", 
    category: ["shooter", "puzzle"], 
    date: "31-01-2025", 
    release_Date: "2008",
    authors: ["Ninja Kiwi"],
    authorLinks: ["https://ninjakiwi.com/"] 
  },
  { 
    name: "celeste-classic", 
    formatted_Name: "Celeste Classic", 
    category: ["platformer", "pico-8"], 
    date: "31-01-2025", 
    release_Date: "21-07-2015",
    authors: ["Maddy Makes Games", "Verdini"],
    authorLinks: ["https://www.maddymakesgames.com/", "https://github.com/Verdini"] 
  },
  { 
    name: "celeste-classic-2-lanis-treck", 
    formatted_Name: "Celeste Classic 2", 
    category: ["platformer", "pico-8"], 
    date: "31-01-2025", 
    release_Date: "25-01-2021",
    authors: ["Maddy Makes Games"],
    authorLinks: ["https://www.maddymakesgames.com/"] 
  },
  { 
    name: "crazy-frog", 
    formatted_Name: "Crazy Frog", 
    category: ["platformer", "endless"], 
    date: "31-01-2025", 
    release_Date: "2005",
    authors: ["Crazy Frog"],
    authorLinks: ["https://www.youtube.com/channel/UC4XR0EZ0oHwSV2XhhShzX5A"] 
  },
  { 
    name: "egg-ascent", 
    formatted_Name: "Egg Ascent", 
    category: ["platformer", "puzzle"], 
    date: "31-01-2025", 
    release_Date: "21-12-2020",
    authors: ["pinkitten"],
    authorLinks: ["https://pinkitten.itch.io/"] 
  },
  { 
    name: "emulatrix", 
    formatted_Name: "Emulatrix", 
    category: ["emulator", "nintendo", "sega", "mame", "arcade", "dos"], 
    date: "31-01-2025", 
    release_Date: "1985",
    authors: ["lrusso"],
    authorLinks: ["https://github.com/lrusso"] 
  },
  { 
    name: "flow", 
    formatted_Name: "flOw", 
    category: ["endless", "simulation", "survival"], 
    date: "31-01-2025", 
    release_Date: "03-2006",
    authors: ["Thatgamecompany", "Jenova Chen"],
    authorLinks: ["https://thatgamecompany.com/", "https://jenovachen.info/"] 
  },
  { 
    name: "meat-boy", 
    formatted_Name: "Meat Boy", 
    category: ["platformer"], 
    date: "31-01-2025", 
    release_Date: "05-10-2008",
    authors: ["Edmund McMillen", "Tommy Refenes"],
    authorLinks: ["https://bluebaby.newgrounds.com/", ""] 
  },
  { 
    name: "minicraft", 
    formatted_Name: "Minicraft", 
    category: ["survival"], 
    date: "31-01-2025", 
    release_Date: "19-12-2011",
    authors: ["Markus 'Notch' Persson"],
    authorLinks: ["https://en.wikipedia.org/wiki/Markus_Persson"] 
  },
  { 
    name: "mission-in-snowdriftland", 
    formatted_Name: "Mission in Snowdriftland", 
    category: ["platformer", "christmas", "nintendo"], 
    date: "31-01-2025", 
    release_Date: "01-12-2006",
    authors: ["Extra Toxic"],
    authorLinks: ["https://www.extratoxic.com/"] 
  },
  { 
    name: "openttd", 
    formatted_Name: "OpenTTD", 
    category: ["puzzle", "endless", "simulation", "transport"], 
    date: "31-01-2025", 
    release_Date: "15-11-1994", 
    authors: ["OpenTTD Contributors", "Ludvig Strigeus", "Chris Sawyer"], 
    authorLinks: ["https://github.com/OpenTTD/OpenTTD", "https://en.wikipedia.org/wiki/Ludvig_Strigeus", "https://www.chrissawyergames.com/"]
  },
  { 
    name: "papas-donuteria", 
    formatted_Name: "Papa's Donuteria", 
    category: ["none"], 
    date: "31-01-2025", 
    release_Date: "16-06-2014", 
    authors: ["Flipline Studios"],
    authorLinks: ["https://www.flipline.com/"]
  },
  { 
    name: "pip!", 
    formatted_Name: "Pip! The Pelican", 
    category: ["platformer", "pico-8"], 
    date: "31-01-2025", 
    release_Date: "2019", 
    authors: ["travisakarare/rarelikeaunicorn"], 
    authorLinks: ["https://rarelikeaunicorn.itch.io/"]
  },
  { 
    name: "prince-of-persia-special-edition", 
    formatted_Name: "Prince of Persia SE", 
    category: ["platformer", "demo"], 
    date: "31-01-2025", 
    release_Date: "2003", 
    authors: ["Ubisoft", "Broderbund"], 
    authorLinks: ["https://www.ubisoft.com/en-au/", "https://www.ubisoft.com/en-au/"]
  },
  { 
    name: "riddle-school-1", 
    formatted_Name: "Riddle School 1", 
    category: ["puzzle"], 
    date: "31-01-2025", 
    release_Date: "25-05-2006", 
    authors: ["Jonochrome"], 
    authorLinks: ["#"]
  },
  { 
    name: "robot-unicorn-attack", 
    formatted_Name: "Robot Unicorn Attack", 
    category: ["platformer", "endless"], 
    date: "31-01-2025", 
    release_Date: "04-02-2010", 
    authors: ["Spiritonin Media Games", "Adult Swim Games"], 
    authorLinks: ["https://web.archive.org/web/20151002101644/http://www.spiritonin.com/", "https://www.adultswim.com/games"]
  },
  { 
    name: "rogue-soul", 
    formatted_Name: "Rogue Soul", 
    category: ["rpg", "fighting"], 
    date: "31-01-2025", 
    release_Date: "27-09-2012", 
    authors: ["SoulGame Studios"], 
    authorLinks: ["https://soulgamestudio.com/"]
  },
  { 
    name: "rogue-soul-2", 
    formatted_Name: "Rogue Soul 2", 
    category: ["rpg", "fighting"], 
    date: "31-01-2025", 
    release_Date: "25-09-2014", 
    authors: ["SoulGame Studios"], 
    authorLinks: ["https://soulgamestudio.com/"]
  },
  { 
    name: "ruffle-swf-player", 
    formatted_Name: "Ruffle SWF Player", 
    category: ["emulator", "swf", "flash", "custom"], 
    date: "31-01-2025", 
    release_Date: "1996", 
    authors: ["Ruffle", "Adobe"], 
    authorLinks: ["https://ruffle.rs", "https://www.adobe.com/"]
  },
  { 
    name: "snailbob", 
    formatted_Name: "Snailbob", 
    category: ["puzzle", "platformer"], 
    date: "31-01-2025", 
    release_Date: "11-2010", 
    authors: ["Hunter Hamster"], 
    authorLinks: ["http://hunter-hamster.com/"]
  },
  { 
    name: "spelunky-classic-hd", 
    formatted_Name: "Spelunky Classic HD", 
    category: ["mining", "dig", "platformer", "roguelike"], 
    date: "31-01-2025", 
    release_Date: "21-12-2008", 
    authors: ["yancharkin and contributors", "Derek Yu"], 
    authorLinks: ["https://github.com/yancharkin/SpelunkyClassicHDhtml5", "https://www.derekyu.com/"]
  },
  { 
    name: "super-mario-bros-crossover", 
    formatted_Name: "Super Mario Bros Crossover", 
    category: ["nintendo", "platformer"], 
    date: "31-01-2025", 
    release_Date: "27-04-2010", 
    authors: ["Exploding Rabbit"], 
    authorLinks: ["https://explodingrabbit.com/"]
  },
  { 
    name: "super-mario-flash", 
    formatted_Name: "Super Mario Flash", 
    category: ["nintendo", "platformer"], 
    date: "31-01-2025", 
    release_Date: "2005", 
    authors: ["Pouetpu"], 
    authorLinks: ["https://pouetpu.fandom.com/wiki/Pouetpu-games"]
  },
  { 
    name: "swords-and-sandals-2", 
    formatted_Name: "Swords and Sandals 2", 
    category: ["fighting", "turn", "strategy"], 
    date: "31-01-2025", 
    release_Date: "07-01-2007", 
    authors: ["Whiskeybarrel Studios"], 
    authorLinks: ["http://whiskeybarrelstudios.com/"]
  },
  { 
    name: "the-binding-of-isaac-demo", 
    formatted_Name: "Binding of Isaac Demo", 
    category: ["rpg", "roguelike", "demo"], 
    date: "09-09-2024", 
    update_Date: "31-01-2025", 
    release_Date: "08-09-2011", 
    authors: ["Edmund McMillen and Florian Himsl"], 
    authorLinks: ["https://bluebaby.newgrounds.com/"]
  },
  { 
    name: "the-tale-of-the-adhd-dinosaur", 
    formatted_Name: "The ADHD Dinosaur", 
    category: ["platformer"], 
    date: "31-01-2025", 
    release_Date: "11-08-2021", 
    authors: ["chickentuna"], 
    authorLinks: ["https://chickentuna.itch.io/"]
  },
  { 
    name: "this-is-the-only-level", 
    formatted_Name: "This is the Only Level", 
    category: ["platformer", "puzzle", "metagame"], 
    date: "31-01-2025", 
    release_Date: "08-08-2009", 
    authors: ["John Cooney"], 
    authorLinks: ["https://wonderfulelephant.com/"]
  },
  { 
    name: "vex", 
    formatted_Name: "Vex", 
    category: ["platformer"], 
    date: "31-01-2025", 
    release_Date: "2013", 
    authors: ["Amazing Adam"], 
    authorLinks: ["https://www.indiedb.com/company/amazing-adam"]
  },
  { 
    name: "vex-2", 
    formatted_Name: "Vex 2", 
    category: ["platformer"], 
    date: "31-01-2025", 
    release_Date: "2014", 
    authors: ["Amazing Adam"], 
    authorLinks: ["https://www.indiedb.com/company/amazing-adam"]
  },
  { 
    name: "zuma", 
    formatted_Name: "Zuma", 
    category: ["puzzle"], 
    date: "31-01-2025", 
    release_Date: "12-12-2003", 
    authors: ["PopCap Studios"], 
    authorLinks: ["https://www.ea.com/en-au/ea-studios/popcap"]
  },
   // ORIGINAL RELEASE DATE
    //17/02/2025
    { 
      name: "divinastros", 
      formatted_Name: "Divinastros", 
      category: ["poker", "card", "balatro", "roguelike", ],
      date: "17-02-2025", 
      release_Date: "04-05-2024", 
      authors: ["Astral Game Studio"], 
      authorLinks: ["https://astralgamestudio.itch.io/"] 
    },
  { 
  name: "pentashift",
  formatted_Name: "Pentashift",
  category: ["puzzle", "shape shifting"], 
  date: "17-02-2025",
  release_Date: "06-12-2024",
  authors: ["1_dimensional"],
  authorLinks: ["https://scratch.mit.edu/users/1_dimensional/"]
},
 { 
  name: "picohot",
  formatted_Name: "PICOHOT",
  category: ["shooter", "pico-8", "time"], 
  date: "17-02-2025",
  release_Date: "01-04-2020",
  authors: ["Piotr Kulla", "Wojciech Dziedzic", "Mariusz Tarkowski"],
  authorLinks: ["https://x.com/piotrkulla", "https://x.com/WojtekDziedzic", "https://tarkovsky.itch.io/"]
},
{
  name: "super-mario-war",
  formatted_Name: "Super Mario War",
  category: ["fighting", "mario", "nintendo", "deathmatch", "multiplayer"],
  date: "17-02-2025",
  update_Date: "31-01-2025",
  release_Date: "2004",
  authors: ["Mátyás Mustoha", "Samuele Poletto", "Florian Hufsky"],
  authorLinks: ["https://github.com/mmatyas", "#", "https://en.wikipedia.org/wiki/Florian_Hufsky"]
},
{
  name: "supertux-classic",
  formatted_Name: "SuperTux Classic",
  category: ["penguin", "mario", "nintendo", "christmas", "open source"],
  date: "17-02-2025",
  release_Date: "11-05-2004",
  authors: ["Alzter", "Bill Kendrick", "Ingo Ruhnke"],
  authorLinks: ["https://github.com/Alzter/SuperTux-Classic", "", ""]
},
{
  name: "taking-shape",
  formatted_Name: "Taking Shape",
  category: ["puzzle", "shape shifter"],
  date: "17-02-2025",
  release_Date: "04-12-2024",
  authors: ["-kippie-"],
  authorLinks: ["https://scratch.mit.edu/users/-kippie-/"]
},
{
  name: "terminus",
  formatted_Name: "Terminus",
  category: ["shooter", "shape shifter"],
  date: "17-02-2025",
  release_Date: "06-12-2024",
  authors: ["polkmnq6"],
  authorLinks: ["https://scratch.mit.edu/users/polkmnq6/"]
},
// 24/02/2025
{
  name: "red-square-game",
  formatted_Name: "Red Square Game",
  category: ["test", "pdhpe"],
  date: "24-02-2025",
  release_Date: "18-06-2005", // hyped up on: 18 June 2005
  update_Date: "09-06-2006", // Kabbuble on 09-06-2006
  authors: ["kabubble", "hypedup.co.uk"],
  authorLinks: ["http://www.kabubble.com/ga_red_square.htm", "http://www.hypedup.co.uk/games/redsquare.html"]
},
{
  name: "swords-and-sandals-crusader",
  formatted_Name: "Swords and Sandals Crusader",
  category: ["turn", "rpg", "fighting", "strategy"],
  date: "24-02-2025",
  release_Date: "2007", //maybe??
  authors: ["Whiskeybarrel Studios"], 
  authorLinks: ["http://whiskeybarrelstudios.com/"]
},


];

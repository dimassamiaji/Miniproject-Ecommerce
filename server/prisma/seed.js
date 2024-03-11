/** @format */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const data = [
  {
    email: "fadly@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    firstName: "fadly",
    lastName: "mamby",
    gender: "male",
    phoneNumber: "081298807077",
    referralCode: "",
    avatarUrl:
      "https://imgsrv2.voi.id/WjEqMKzrXoQQvMyNmpfJrb69U5WO2jgd1eqrHg-lOyA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zNDMxMTEvMjAyMzEyMjkxMzI1LW1haW4uY3JvcHBlZF8xNzAzODM0OTI5LmpwZWc.jpg",
    id: 1,
    role: "user",
  },
  {
    email: "dimas@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    firstName: "dimas",
    lastName: "samiaji",
    gender: "male",
    phoneNumber: "081298807077",
    referralCode: "",
    avatarUrl:
      "https://imgsrv2.voi.id/WjEqMKzrXoQQvMyNmpfJrb69U5WO2jgd1eqrHg-lOyA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zNDMxMTEvMjAyMzEyMjkxMzI1LW1haW4uY3JvcHBlZF8xNzAzODM0OTI5LmpwZWc.jpg",
    id: 2,
    role: "user",
  },
  {
    email: "admin@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    firstName: "admin",
    lastName: "tatolong",
    id: 3,
    role: "organizer",
    phoneNumber: "081298807077",
    referralCode: "",
    events: {
      create: [
        {
          id: 1,
          eventName: "Coldplay in Jakarta",
          image_url:
            "https://cdn0-production-images-kly.akamaized.net/5KqQ4jBbK1JfzJRnE4nTClyxULs=/800x800/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4473140/original/076383900_1687229266-20230620_093544.jpg",
          location: "Jakarta",
          eventDate: new Date("2023-06-15"),
          price: 2400000,
          description:
            "Coldplay's concerts are famed for mind-blowing special effects such as pyrotechnic and confetti visuals. The band will use biodegradable confetti adapted to require less compressed gas for ignition, while pyrotechnics will have less explosive charge and new formulas to reduce harmful chemicals",
        },

        {
          id: 2,
          eventName: "Black Pink Concert",
          image_url:
            "https://cdn0-production-images-kly.akamaized.net/v11pJUro9J7xGHs5lVlXeWSwHZo=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4206680/original/005389400_1666940787-FgIgDw6VIAMuk-m__1_.jpg",
          location: "Bali",
          eventDate: new Date("2023-09-08"),
          price: 1400000,
          description:
            "Blackpink is a South Korean girl group formed by YG Entertainment, consisting of members Jisoo, Jennie, Lisa, and Rose. The group debuted on August 8, 2016, with their single Square One, which spawned Whistle, their first number-one song in South Korea",
        },
        {
          id: 3,
          eventName: "Ed Sheraan Concert",
          image_url:
            "https://cdn0-production-images-kly.akamaized.net/pEMTQdwWxtq-kVD9h-LZJnN8J0I=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4745569/original/003241000_1708173363-EdSheeran-JKT-KV-151023-IGF.jpg",
          location: "Jakarta",
          eventDate: new Date("2023-03-12"),
          price: 2100000,
          description:
            "The acoustics, the stage setup and set list were excellent, and for almost 3 hours, Ed kept the crowd dancing, singing and cheering along. At times it felt like a pub sing along with everyone in the audience knowing all the songs - only with 65,000 of your closest friends. Great concert, great night",
        },
        {
          id: 4,
          eventName: "Justin Bieber Concert",
          image_url:
            "https://asset.kompas.com/crops/WvtT61bpg6fHiO30-lewqZvRxr0=/0x0:0x0/750x500/data/photo/2022/03/24/623c3ea5af78d.jpg",
          location: "Semarang",
          eventDate: new Date("2023-04-17"),
          price: 3600000,
          description:
            "Justin Bieber earns an impressive $1 million per concert, making his tours a significant source of his $300 million net worth. The Justice World tour generated substantial revenue. Bieber had to cancel some tour eventDates due to health issues",
        },
        {
          id: 5,
          eventName: "Alan Walker Concert",
          image_url:
            "https://sp-ao.shortpixel.ai/client/to_auto,q_lossless,ret_img,w_1000,h_998/https://sethlui.com/wp-content/uploads/2023/08/Alan-Walker-Concert-poster.jpg",
          location: "Palembang",
          eventDate: new Date("2023-07-11"),
          price: 2100000,
          description:
            "Alan Walker Concerts usually last for around 1 hour to 3 hours however this is dependent on the setlist (songs that are planned to be performed). What's the Alan Walker setlist? Alan Walker's setlist can vary depending on the venue and the country the performance is played",
        },
        {
          id: 6,
          eventName: "Bring Me The Horizon",
          image_url:
            "https://tugaspti140110070088.files.wordpress.com/2010/12/posterbmth.jpg?w=584",
          location: "Boyolali",
          eventDate: new Date("2023-09-14"),
          price: 2200000,
          description:
            "As this was my first time seeing them all of my expectations were met but they also went beyond my expectations. Even though their music is expectably amazing they can also put on a show without the music. This was amazing for fans as we felt more connected to them on a personal basis through their music",
        },
      ],
    },
  },
];

async function main() {
  try {
    data.map(async (user) => {
      const newUser = await prisma.user.create({
        data: user,
      });
      console.log(`Created user with id: ${newUser.id}`);
    });
    console.log(`Seeding finished.`);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => {
    prisma.$disconnect;
  })
  .catch((err) => {
    console.log(err);
    prisma.$disconnect;
    process.exit(1);
  });

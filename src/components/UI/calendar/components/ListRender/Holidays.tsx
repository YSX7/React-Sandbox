let Holidays = {
  "83": "march8",
  "232": "february23",
  "39": "september3",
};

let Images = import.meta.glob<string>("./img/*.png", {
  import: "default",
  eager: true,
});

//Меняем ключи с путей к файлу на месяц число
for (let key of Object.keys(Images))
  delete Object.assign(Images, {
    [key.match(/\w+(?=\.png)/)![0]]: Images[key],
  })[key];

for (const [key, value] of Object.entries(Holidays)) {
  Holidays[key as keyof typeof Holidays] = Images[value];
}

export default Holidays;

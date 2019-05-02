const data = require('../../data')

const createVolcano = (knex, volcano) => {
  return knex("volcano")
    .insert(
      {
        name: volcano.name,
        location: volcano.location,
        heightInFeet: volcano.heightInFeet,
        stillActive: volcano.stillActive
      },
      'id'
    )
    .then(volcanoID => {
      let eruptionPromises = [];

      volcano.eruptions.forEach(eruption => {
        eruptionPromises.push(
          createEruption(knex, {
            year: eruption.year,
            deathToll: eruption.deathToll,
            volcanoID: volcanoID[0]
          })
        );
      });

      return Promise.all(eruptionPromises);
    });
};

const createEruption = (knex, eruption) => {
  return knex("eruption").insert(eruption);
};

exports.seed = (knex, Promise) => {
  return knex("eruption")
    .del()
    .then(() => knex("volcano").del())
    .then(() => {
      let volcanoPromises = [];

      data.forEach(volcano => {
        volcanoPromises.push(createVolcano(knex, volcano));
      });

      return Promise.all(volcanoPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

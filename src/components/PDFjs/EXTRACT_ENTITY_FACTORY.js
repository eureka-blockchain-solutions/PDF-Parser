import { ALL_NAMES } from "../../data/AllNames";
import { TWENTY_K_ENGLISH_WORDS } from "../../data/EnglishWords";
import nlp from "compromise";

export const EXTRACT_ENTITIES = text => {
  let entities = [];
  text
    .split(/,|and /g)
    .map(s => s.toString().trim())
    .map(token => {
      let entity = extractEntities(token);
      if (entity) {
        if (entity[0].firstName && entity[0].lastName) {
          entities.push(entity);
        }
      } else {
        const array = token.split(" ");

        // array has at least 2 entries, first letters of each entry are capitalized, ALL_NAMES includes the given token
        if (areGeneralNameRequirementsSatisfied(array)) {
          array.forEach(name => {
            if (areSpecificNameRequirementsSatisfied(name)) {
              // join rest of the array starting from position 1
              const lastName = array.splice(1).join(" ");
              entities.push([
                {
                  firstName: array[0],
                  lastName,
                  text: token
                }
              ]);
            }
          });
        }
      }
    });
  return entities;
};

const areGeneralNameRequirementsSatisfied = array => {
  const MAX_NUMBER_OF_WORDS_FOR_NAME = 3;
  return (
    areFirstLettersCapitalized(array) &&
    array.length > 1 &&
    array.length <= MAX_NUMBER_OF_WORDS_FOR_NAME
  );
};

//TODO: search for common english words and excludes these names that are in that list
const areSpecificNameRequirementsSatisfied = name => {
  return (
    (ALL_NAMES.includes(name.substr(0, name.length - 3)) ||
      ALL_NAMES.includes(name.substr(0, name.length - 2)) ||
      ALL_NAMES.includes(name.substr(0, name.length - 1)) ||
      ALL_NAMES.includes(name)) &&
    !TWENTY_K_ENGLISH_WORDS.includes(name.toLowerCase()) &&
    areAllLetters(name)
  );
};

const areAllLetters = name => {
  const letters = /^[A-Za-z]+$/;
  return name.match(letters);
};

const areFirstLettersCapitalized = array => {
  let flag = true;
  for (let i = 0; i < array.length; i++) {
    if (!isFirstLetterCapitalized(array[i], i)) {
      flag = false;
    }
  }
  return flag;
};

const isFirstLetterCapitalized = word => {
  return /[A-Z]/.test(word);
};

// Named-entities: - get the people, places, organizations:
const extractEntities = sentence => {
  const entities = nlp(sentence)
    .people()
    .data();

  if (entities.length > 0) return entities;
  return null;
};

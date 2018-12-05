const schemes = {
    users: [ "first_name", "last_name", "username", "password" ],
    posts: [ "title", "description", "code" ],
    ratings: ["rating" ]
}

function verifyEntry(entry, scheme) {
  const requirements = schemes[scheme];


  const errors = requirements.reduce((acc, property) => {
    if (!entry[property]) {
      acc.push(property);
    }

    return acc;
  }, [] );

  return errors;
}

module.exports = { verifyEntry };

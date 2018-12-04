const schemes = {
    users: [ "first_name", "last_name", "username", "password" ],
    posts: [ "title", "description", "code" ],
    comments: [ "content" ]
}

function verifyEntry(entry, scheme) {
  const requirements = schemes[scheme];

  // console.log(requirements)

  const errors = requirements.reduce((acc, property) => {
    if (!entry[property]) {
      acc.push(property);
    }

    return acc;
  }, [] );

  return errors;
}

module.exports = { verifyEntry };

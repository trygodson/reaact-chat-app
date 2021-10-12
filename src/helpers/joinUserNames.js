export const joinUserNames = (people, currentPerson) => {
  return (
    '@' +
    people
      .map(p => p.person.username)
      .filter(un => un !== currentPerson)
      .join(', @')
  );
};

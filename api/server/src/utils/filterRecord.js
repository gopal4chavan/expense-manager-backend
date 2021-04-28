export function filterRecord(record) {
  const {createdAt, updatedAt, token, passwordHash, ...rest} = record.dataValues;
  return rest;
}
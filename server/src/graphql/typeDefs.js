const {gql} = require("apollo-server");

const typeDefs = gql`
type Query {
  getAllSets(
    setName: String,
    songs: [String],
    musicStyles: [String],
    instrumentation: [String],
    languages: [String],
    raag: [String],
    key: String,
    setLead: [String],
    date: String,
    name: String
  ): [Set!]!
  getAllShows:[Show!]!
  getAllRaags:[String]
  getAllStyles: [String]
  getAllInstruments: [String]
  getAllLanguages: [String]
}

type Show {
  key: String!
  setLead: [String]
  date: String
  name: String
}

type Set {
  setName: String!
  songs: [String]
  musicStyles: [String]
  instrumentation: [String]
  languages: [String]
  raag: [String]
  mostRecentPerformance: Show!
}
`;

module.exports = {typeDefs};
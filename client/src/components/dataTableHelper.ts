import { gql } from "@apollo/client";

// Define the GraphQL query
export const GET_ALL_SETS = gql`
  query GetAllSets($raagFilters: [String], $styleFilters: [String], $languageFilters: [String]) {
    getAllSets(raag: $raagFilters, musicStyles: $styleFilters, languages: $languageFilters) {
      setName
      songs
      musicStyles
      instrumentation
      languages
      raag
      mostRecentPerformance {
        key
        setLead
        date
        name
      }
    }
  }
`;

export const GET_RAAGS = gql`
  query Query {
    getAllRaags
  }
`;

export const GET_STYLES = gql`
  query Query {
    getAllStyles
  }
`;

export const GET_LANGUAGES = gql`
  query Query {
    getAllLanguages
  }
`;

export const GET_INSTRUMENTS = gql`
  query Query {
    getAllInstruments
  }
`;
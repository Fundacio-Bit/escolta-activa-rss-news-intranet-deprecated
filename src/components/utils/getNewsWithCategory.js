// var categoriesDict = require("./categories-dictionary.js");

const companiesDict = [
  { term: "Aegean", search_mode: "exact" },
  { term: "Aeroflot", search_mode: "substring" },
  { term: "Air Baltic ", search_mode: "substring" },
  { term: "Air Europa", search_mode: "substring" },
  { term: "Air France", search_mode: "substring" },
  { term: "Air Lingus", search_mode: "substring" },
  { term: "Air Nostrum", search_mode: "substring" },
  { term: "Air Serbia", search_mode: "substring" },
  { term: "Air Transat", search_mode: "substring" },
  { term: "Alitalia", search_mode: "substring" },
  { term: "American airlines", search_mode: "substring" },
  { term: "Anisec", search_mode: "substring" },
  { term: "ASL France", search_mode: "substring" },
  { term: "Azur Air", search_mode: "substring" },
  { term: "BA City Fliyer", search_mode: "substring" },
  { term: "Binter", search_mode: "substring" },
  { term: "Blue Air", search_mode: "substring" },
  { term: "Brussels Airlines", search_mode: "substring" },
  { term: "Condor", search_mode: "substring" },
  { term: "Corendon ", search_mode: "substring" },
  { term: "EasyJet", search_mode: "substring" },
  { term: "Edelweiss", search_mode: "substring" },
  { term: "El Al", search_mode: "exact" },
  { term: "Eurowings", search_mode: "substring" },
  { term: "Evelop", search_mode: "exact" },
  { term: "Finnair ", search_mode: "substring" },
  { term: "Grupo Tui", search_mode: "substring" },
  { term: "Iberia", search_mode: "substring" },
  { term: "Jet2.com", search_mode: "substring" },
  { term: "KLM", search_mode: "substring" },
  { term: "Laudamotion", search_mode: "substring" },
  { term: "Neos", search_mode: "exact" },
  { term: "Nordstar", search_mode: "substring" },
  { term: "Norwegian", search_mode: "substring" },
  { term: "Rossiya", search_mode: "substring" },
  { term: "Royal Air Maroc", search_mode: "substring" },
  { term: "Ryanair", search_mode: "substring" },
  { term: "S7 airlines", search_mode: "substring" },
  { term: "SAS", search_mode: "exact" },
  { term: "SmartLynx", search_mode: "substring" },
  { term: "Sunexpress", search_mode: "substring" },
  { term: "Swiss Air", search_mode: "substring" },
  { term: "Swiss airlines", search_mode: "substring" },
  { term: "Swiss International Airlines", search_mode: "substring" },
  { term: "TAP", search_mode: "exact" },
  { term: "Tarom", search_mode: "exact" },
  { term: "Transavia ", search_mode: "substring" },
  { term: "Transsavia Holland", search_mode: "substring" },
  { term: "TUI Fly Belgium", search_mode: "substring" },
  { term: "Ukraine Airlines", search_mode: "substring" },
  { term: "Ural airlines", search_mode: "substring" },
  { term: "Volotea", search_mode: "substring" },
  { term: "Vueling", search_mode: "substring" },
  { term: "Wizz Air", search_mode: "substring" },
]

const categoriesDict = {
  covid: [
    { term: "covid", search_mode: "substring" },
    { term: "coronavirus", search_mode: "substring" },
    { term: "korona", search_mode: "substring" },
    { term: "covid", search_mode: "substring" },
    { term: "covid-19", search_mode: "substring" },
    { term: "coronavirus", search_mode: "substring" },
    { term: "brote", search_mode: "substring" },
    { term: "outbreak", search_mode: "substring" },
    { term: "ausbruch", search_mode: "substring" },
    { term: "focolaio", search_mode: "substring" },
    { term: "apparition", search_mode: "substring" },
    { term: "utbrott", search_mode: "substring" },
    { term: "uitbraak", search_mode: "substring" },
    { term: "pandemia", search_mode: "substring" },
    { term: "pandemic", search_mode: "substring" },
    { term: "pandemie", search_mode: "substring" },
    { term: "pandémie", search_mode: "substring" },
    { term: "pandemisk", search_mode: "substring" },
    { term: "cuarentena", search_mode: "substring" },
    { term: "quarantine", search_mode: "substring" },
    { term: "quarantäne", search_mode: "substring" },
    { term: "quarantena", search_mode: "substring" },
    { term: "quarantaine", search_mode: "substring" },
    { term: "karantän", search_mode: "substring" },
    { term: "pcr", search_mode: "exact" },
  ],
  tourism: [
    { term: "turis", search_mode: "substring" },
    { term: "turísti", search_mode: "substring" },
    { term: "touris", search_mode: "substring" },
    { term: "toeris", search_mode: "substring" },
    { term: "vacacion", search_mode: "substring" },
    { term: "urlaub", search_mode: "substring" },
    { term: "vacanc", search_mode: "substring" },
    { term: "holiday", search_mode: "substring" },
    { term: "högtider", search_mode: "substring" },
    { term: "vakantie", search_mode: "substring" },
    { term: "reiseverband", search_mode: "substring" },
    { term: "asociación de viaje", search_mode: "substring" },
    { term: "agencia de viajes", search_mode: "substring" },
    { term: "agencias de viajes", search_mode: "substring" },
    { term: "travel agency", search_mode: "substring" },
    { term: "agence de voyages", search_mode: "substring" },
    { term: "agenzia di viaggi", search_mode: "substring" },
    { term: "reserbyr", search_mode: "substring" },
    { term: "reisebureau", search_mode: "substring" },
    // { term: "reserva", search_mode: "substring" },
    { term: "booking", search_mode: "substring" },
    { term: "reservierung", search_mode: "substring" },
    { term: "rèservation", search_mode: "substring" },
    { term: "prenotazione", search_mode: "substring" },
    { term: "reservering", search_mode: "substring" },
    // { term: "verano", search_mode: "substring" },
    // { term: "estiu", search_mode: "substring" },
    // { term: "sommer", search_mode: "substring" },
    // { term: "summer", search_mode: "substring" },
    // { term: "sommar", search_mode: "substring" },
    { term: "sommerferien", search_mode: "substring" },
    { term: "estate", search_mode: "substring" },
    { term: "été", search_mode: "exact" },
    { term: "zomer", search_mode: "substring" },
    // { term: "hotel", search_mode: "substring" },
    { term: "hoteler", search_mode: "substring" },
    { term: "camping", search_mode: "substring" },
    { term: "aeropuerto", search_mode: "substring" },
    { term: "aeroport", search_mode: "substring" },
    { term: "airport", search_mode: "substring" },
    { term: "flughafen", search_mode: "substring" },
    { term: "flygplats", search_mode: "substring" },
    { term: "luchthaven", search_mode: "substring" },
    { term: "vuelo", search_mode: "exact" },
    { term: "vuelos", search_mode: "exact" },
    { term: "flight", search_mode: "substring" },
    { term: "flyg", search_mode: "exact" },
    { term: "vlucht", search_mode: "substring" },
    // { term: "beach", search_mode: "substring" },
    // { term: "playa", search_mode: "substring" },
    // { term: "platja", search_mode: "substring" },
    // { term: "strand", search_mode: "substring" },
    // { term: "spiag", search_mode: "substring" },
    // { term: "plage", search_mode: "substring" },
    { term: "turoperador", search_mode: "substring" },
    { term: "tour operator", search_mode: "substring" },
    { term: "operador turístic", search_mode: "substring" },
    { term: "reiseveranstalter", search_mode: "substring" },
    { term: "aerolínea", search_mode: "substring" },
    { term: "fluggesellschaft", search_mode: "substring" },
    { term: "airline", search_mode: "substring" },
    { term: "compagnie aérienne", search_mode: "substring" },
    { term: "linea aerea", search_mode: "substring" },
    { term: "aerolínia", search_mode: "substring" },
    { term: "flygbolag", search_mode: "substring" },
    { term: "aerolínea", search_mode: "substring" },
    { term: "pasajer", search_mode: "substring" },
    { term: "passager", search_mode: "substring" },
    { term: "passatger", search_mode: "substring" },
    { term: "passenger", search_mode: "substring" },
    { term: "passagier", search_mode: "substring" },
    { term: "passagerare", search_mode: "substring" },
    { term: "pernoctaciones", search_mode: "substring" },
    { term: "pernoctacions", search_mode: "substring" },
    { term: "overnight stays", search_mode: "substring" },
    { term: "übernachtungen", search_mode: "substring" },
    { term: "nuitées", search_mode: "substring" },
    { term: "pernottamenti", search_mode: "substring" },
    { term: "övernattningar", search_mode: "substring" },
    { term: "overnachtingen", search_mode: "substring" },
    { term: "ocean drive", search_mode: "substring" },
    { term: "melià", search_mode: "exact" },
    { term: "melia", search_mode: "exact" },
    { term: "cadena riu", search_mode: "exact" },
    { term: "barceló", search_mode: "exact" },
    { term: "nh", search_mode: "exact" },
    { term: "h10", search_mode: "exact" },
    { term: "paradores", search_mode: "substring" },
    { term: "grupo piñero", search_mode: "substring" },
    { term: "compañía hipotels", search_mode: "substring" },
    { term: "empresa hipotels", search_mode: "substring" },
    { term: "cadena hipotels", search_mode: "substring" },
    { term: "compañía grupotel", search_mode: "substring" },
    { term: "empresa grupotel", search_mode: "substring" },
    { term: "cadena grupotel", search_mode: "substring" },
    { term: "tui", search_mode: "exact" },
    { term: "grupo tui", search_mode: "substring" },
    { term: "jet2holidays", search_mode: "substring" },
    { term: "fti", search_mode: "exact" },
    { term: "reisen", search_mode: "substring" },
    // { term: "viaj", search_mode: "substring" },
    { term: "viajeros", search_mode: "substring" },
    { term: "gatwick", search_mode: "substring" },
    { term: "airbnb", search_mode: "substring" },
    { term: "kuoni", search_mode: "substring" },
    { term: "der touristik", search_mode: "substring" },
    { term: "exim holding", search_mode: "substring" },
    { term: "crucer", search_mode: "substring" },
    { term: "cruise", search_mode: "substring" },
    { term: "alltours", search_mode: "substring" },
    { term: "club med", search_mode: "substring" },
    { term: "compañía club med", search_mode: "substring" },
    { term: "alpitour", search_mode: "substring" },
    { term: "hotelplan", search_mode: "substring" },
    { term: "primera group", search_mode: "substring" },
    { term: "fram", search_mode: "exact" },
    { term: "compañía fram", search_mode: "exact" },
    { term: "grupo pegas", search_mode: "substring" },
    { term: "compañía pegas", search_mode: "substring" },
    { term: "operador turístico pegas", search_mode: "substring" },
    { term: "touroperador pegas", search_mode: "substring" },
    { term: "cadena pegas", search_mode: "substring" },
    { term: "tez tour", search_mode: "substring" },
    { term: "china eastern airlines", search_mode: "substring" },
    { term: "ryanair", search_mode: "substring" },
    { term: "air china", search_mode: "substring" },
    { term: "turkish airlines", search_mode: "substring" },
    { term: "lufthansa", search_mode: "substring" },
    { term: "latam airlines group", search_mode: "substring" },
    { term: "easyjet", search_mode: "substring" },
    { term: "all nippon airways", search_mode: "substring" },
    { term: "emirates", search_mode: "substring" },
    { term: "british airways", search_mode: "substring" },
    { term: "jetblue airways", search_mode: "substring" },
    { term: "aeroflot russian airlines", search_mode: "substring" },
    { term: "indigo", search_mode: "exact" },
    { term: "alaska airlines", search_mode: "substring" },
    { term: "air france", search_mode: "substring" },
    { term: "norwegian air", search_mode: "substring" },
    { term: "turkish airlines", search_mode: "substring" },
    { term: "easyjet", search_mode: "substring" },
    { term: "air france", search_mode: "exact" },
    { term: "klm", search_mode: "exact" },
    { term: "grupo internacional de aerolíneas", search_mode: "exact" },
    { term: "iag", search_mode: "exact" },
    { term: "iberia", search_mode: "exact" },
    { term: "british airways", search_mode: "substring" },
    { term: "aer lingus", search_mode: "substring" },
    { term: "vueling", search_mode: "substring" },
    { term: "air nostrum", search_mode: "substring" },
    { term: "air europa", search_mode: "substring" },
    { term: "cancelación", search_mode: "substring" },
    { term: "aufhebung", search_mode: "substring" },
    { term: "cancellation", search_mode: "substring" },
    { term: "annulation", search_mode: "substring" },
    { term: "cancellazione", search_mode: "substring" },
    { term: "annulering", search_mode: "substring" },
    { term: "annullering", search_mode: "substring" },
    { term: "imserso", search_mode: "substring" },
    { term: "turismo social", search_mode: "substring" },
    { term: "mundiplan", search_mode: "substring" },
    { term: "alojamiento", search_mode: "substring" },
    { term: "boende", search_mode: "substring" },
    { term: "accommodatie", search_mode: "substring" },
    { term: "hébergement", search_mode: "substring" },
    { term: "alloggio", search_mode: "substring" },
    { term: "unterkunft", search_mode: "substring" },
    { term: "accommodation", search_mode: "substring" },
    { term: "demanda vacacional", search_mode: "substring" },
    { term: "temporada de verano", search_mode: "substring" },
    { term: "pasajero", search_mode: "substring" },
    { term: "tránsito aéreo", search_mode: "substring" },
    { term: "tránsito marítimo", search_mode: "substring" },
    { term: "globalia", search_mode: "substring" },
    { term: "alitalia", search_mode: "substring" },
    { term: "flybair", search_mode: "substring" },
    { term: "trasmediterránea", search_mode: "substring" },
    { term: "lot", search_mode: "exact" },
    { term: "rent a car", search_mode: "substring" },
    { term: "hertz", search_mode: "exact" },
    { term: "avis", search_mode: "exact" },
    { term: "europcar", search_mode: "exact" },
    { term: "sixt", search_mode: "exact" },
    { term: "goldcar", search_mode: "exact" },
    { term: "cicar", search_mode: "exact" },
    { term: "autos cabrera medina", search_mode: "exact" },
    { term: "paylesscar", search_mode: "exact" },
    { term: "special prices autoreisen", search_mode: "exact" },
    { term: "top car reisen", search_mode: "exact" },
    { term: "pluscar", search_mode: "exact" },
    { term: "ultramar cars", search_mode: "exact" },
    { term: "piat", search_mode: "exact" },
    { term: "ballermann", search_mode: "substring" },
    { term: "iberostar", search_mode: "substring" },
    { term: "banderas azules", search_mode: "substring" },
    { term: "bandera azul", search_mode: "substring" },
    { term: "charter", search_mode: "substring" },
    { term: "acciona", search_mode: "exact" },
    { term: "norwegian air", search_mode: "substring" },
    { term: "neos air", search_mode: "exact" },
    { term: "canaryfly", search_mode: "substring" },
    { term: "corendon", search_mode: "exact" },
    { term: "travel service eslovaquia", search_mode: "substring" },
    { term: "binter", search_mode: "exact" },
    { term: "tuifly", search_mode: "substring" },
    { term: "germania", search_mode: "substring" },
    { term: "jet2", search_mode: "substring" },
    { term: "smart wings", search_mode: "substring" },
    { term: "tap air portugal", search_mode: "substring" },
    { term: "laudamotion", search_mode: "substring" },
    { term: "thomas cook", search_mode: "substring" },
    { term: "air algerie", search_mode: "substring" },
    { term: "travel service polska", search_mode: "substring" },
    { term: "luxair", search_mode: "substring" },
    { term: "air arabia maroc", search_mode: "substring" },
    { term: "condor", search_mode: "substring" },
    { term: "air maroc", search_mode: "substring" },
    { term: "bulgaria air", search_mode: "substring" },
    { term: "blue air", search_mode: "exact" },
    { term: "swiss air", search_mode: "exact" },
    { term: "eurowings", search_mode: "substring" },
    { term: "sas", search_mode: "exact" },
    { term: "ncl", search_mode: "exact" },
    { term: "royal caribbean", search_mode: "substring" },
    { term: "holland america line", search_mode: "substring" },
    { term: "cunard", search_mode: "exact" },
    { term: "regent", search_mode: "exact" },
  ],
};

export const getNewsWithCategory = (newsArray) => {
    // assign a category for each document after cheking if any term belonging to that category
    // appears in any content field (title, summary, description, content_value and tags).
    // Category values are: covid, tourism, both and none.
    newsArray.map((doc) => {
      const title =
        "title" in doc && doc.title !== undefined && typeof doc.title === "string"
          ? doc.title
          : "";
  
      const summary =
        "summary" in doc &&
        doc.summary !== undefined &&
        typeof doc.summary === "string"
          ? doc.summary
          : "";
  
      const description =
        "description" in doc &&
        doc.description !== undefined &&
        typeof doc.description === "string"
          ? doc.description
          : "";
  
      const content_value =
        "content_value" in doc &&
        doc.content_value !== undefined &&
        typeof doc.content_value === "string"
          ? doc.content_value
          : "";
  
      const tags =
        "tags" in doc && doc.tags !== undefined && typeof doc.tags === "string"
          ? doc.tags
          : "";
  
      let concatenatedTexts =
        title +
        " " +
        summary +
        " " +
        description +
        " " +
        content_value +
        " " +
        tags;
  
      const getCategoryTerms = (text, category_terms) => {
        let matched_terms = []
        for (var i = 0; i < category_terms.length; i++) {
          // Check for exact match (search_mode should be "exact")
          if (
            category_terms[i].search_mode === "exact" &&
            new RegExp(
              "(\\W+|^)" + category_terms[i].term.toLowerCase + "(\\W+|$)",
              "g"
            ).test(text.toLowerCase())
          ) {
            matched_terms.push(category_terms[i].term);
          }
          // Check for partial match (search_mode should be "substring")
          else if (
            category_terms[i].search_mode === "substring" &&
            text.toLowerCase().includes(category_terms[i].term.toLowerCase())
          ) {
            matched_terms.push(category_terms[i].term);
          }
        }
        return matched_terms;
      };

      let categories = [];
      if (
        getCategoryTerms(concatenatedTexts, categoriesDict["covid"]).length > 0 &&
        getCategoryTerms(concatenatedTexts, categoriesDict["tourism"]).length > 0
      ) {
        const terms = getCategoryTerms(concatenatedTexts, categoriesDict["covid"]).concat(getCategoryTerms(concatenatedTexts, categoriesDict["tourism"]));
        // console.log("COVID: ", terms)
        // doc.category = {"name": "covid-turisme", "terms": terms};
        categories.push({"name": "covid-turisme", "terms": terms});
      }
      if (getCategoryTerms(concatenatedTexts, companiesDict).length > 0) {
        const terms = getCategoryTerms(concatenatedTexts, companiesDict);
        // console.log("AIRLINE:", terms)
        // doc.category = {"name": "airline", "terms": terms};
        categories.push({"name": "airline", "terms": terms});
      }
      // console.log("categories: ", categories)
      doc.category = categories;
      return doc;
    });
    return newsArray;
  };
  
  
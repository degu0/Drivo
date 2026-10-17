export const CRLV_PROMPT = `
You will receive an image or a PDF of a document.

1. Check whether it is a Brazilian CRLV (Certificado de Registro e Licenciamento de Veículo).
   If it is not, return "isCrlv": false and all other fields as null.

2. If it is a CRLV, extract the vehicle data:
   - plate: the license plate, uppercase letters and digits only, no hyphens or spaces.
   - chassis: the chassis number (17 characters).
   - renavam: the RENAVAM code (11 digits; left-pad with zeros if it has fewer).
   - brand and model: split the MARCA/MODELO/VERSÃO field into brand and model.
     Write the brand in full (e.g. "VW" → "Volkswagen", "GM" → "Chevrolet", "FIAT" → "Fiat").
   - manufactureYear and modelYear: the manufacture year and the model year.
   - color: the predominant color, in Portuguese, with the first letter capitalized (e.g. "Prata").
   - fuel: convert to one of these values:
     GASOLINA, ETANOL, FLEX, DIESEL, GNV, ELETRICO, HIBRIDO.
     "ALCOOL/GASOLINA" or "GASOLINA/ALCOOL" means FLEX.
   - type: convert the ESPÉCIE/TIPO field to one of these values:
     CARRO, MOTO, CAMINHONETE, CAMINHAO, ONIBUS, OUTRO.

3. Important rules:
   - If a field is illegible or missing, return null. Never make up values.
   - Ignore the owner's personal data (name, CPF, address).
`.trim();

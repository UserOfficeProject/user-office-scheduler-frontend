FROM cypress/included:5.3.0

WORKDIR /e2e

COPY cypress.json .
COPY package* ./
COPY tsconfig.json .

# force re-build 1
RUN npm ci

COPY . ./cypress
COPY wait-for-frontend.sh /

RUN chmod +x /wait-for-frontend.sh

ENTRYPOINT ["npm", "run", "cy:run"]
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
    async find(ctx) {
        let entities;
        const user = ctx.state.user.id;
        if (ctx.query._q) {
          entities = await strapi.services.bills.search({...ctx.query, user});
        } else {
          entities = await strapi.services.bills.find({...ctx.query, user});
        }
        return entities.map((entity) =>
          sanitizeEntity(entity, { model: strapi.models.bills })
        );
      },
    
      async create(ctx) {
        let entity;
        const user = ctx.state.user.id;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.bills.create({ ...data, user }, { files });
        } else {
          entity = await strapi.services.bills.create({
            ...ctx.request.body,
            user,
          });
        }
        return sanitizeEntity(entity, { model: strapi.models.bills });
      },
};

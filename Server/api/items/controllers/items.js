const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  
  async find(ctx) {
    let entities;
    const user = ctx.state.user.id;
    if (ctx.query._q) {
      entities = await strapi.services.items.search({...ctx.query, user});
    } else {
      entities = await strapi.services.items.find({...ctx.query, user});
    }
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.items })
    );
  },

  async create(ctx) {
    let entity;
    const user = ctx.state.user.id;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.items.create({ ...data, user }, { files });
    } else {
      entity = await strapi.services.items.create({
        ...ctx.request.body,
        user,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.items });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [items] = await strapi.services.items.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!items) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.items.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.items.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.items });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [items] = await strapi.services.items.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!items) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await strapi.services.items.delete({ id });

    return sanitizeEntity(entity, { model: strapi.models.items });
  },
};

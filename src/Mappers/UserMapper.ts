export class UserMapper {
    private static readonly objectMapper = require('object-mapper');

    private static readonly transformToResponseUserCreate = {
      email: 'email',
      name: 'name',
      whatsapp: 'whatsapp',
      type: 'type',
      active: 'active',
    };
  
    static mapResponseUserCreate(user: any) {
      return this.objectMapper(user, {}, this.transformToResponseUserCreate);
    }
}
import { randomBytes, randomUUID } from 'node:crypto';

export class UniqueIdGenerator {
  // Generar UUID v4 (nativo)
  static uuid() {
    return randomUUID();
  }

  // Generar con nanoid (puedes pasar la longitud)
  static nano(length = 21) {
    // return nanoid(length);
  }

  // Generar ID con randomBytes en HEX
  static hex(length = 16) {
    return randomBytes(length).toString('hex');
  }

  // Método general para elegir estrategia
  static generate(strategy = 'uuid', options: { length?: number } = {}) {
    switch (strategy) {
      case 'uuid':
        return this.uuid();
      case 'nano':
        return this.nano(options?.length || 21);
      case 'hex':
        return this.hex(options?.length || 16);
      default:
        throw new Error('Estrategia desconocida. Usa: uuid | nano | hex');
    }
  }
}


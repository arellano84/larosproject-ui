
/*
17.19. Criando classes de modelo e usando no cadastro de lançamentos
*/
export class Movimiento {
  codigo: number;
  descripcion: string;
	fechaVencimiento: Date;
	fechaPago: Date;
	valor: number;
	observacion: string;
	tipo =  'INGRESO';
	persona = new Persona();
  categoria = new Categoria();
}

export class Categoria {
  codigo: number;
}

export class Persona {
  codigo: number;
  documento: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  activo = true;
  direccion = new Direccion();
}

export class Direccion {
  tipo: string;
  calle: string;
  numero: string;
  complemento: string;
  cp: string;
  municipio: string;
  ciudad: string;
  pais: string;
}



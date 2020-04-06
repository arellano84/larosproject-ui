

export class Persona {
  codigo: number;
}
export class Categoria {
  codigo: number;
}

export class Movimiento {
  codigo: number;
  descripcion: string;
	fechaVencimiento: Date;
	fechaPago: Date;
	valor: number;
	observacion: string;
	tipo =  'RECEITA';
	persona = new Persona();
  categoria = new Categoria();
}

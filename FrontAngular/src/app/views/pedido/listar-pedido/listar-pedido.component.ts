import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pedido } from 'src/app/shared/models/cliente.model';
import { ItemDoPedido } from 'src/app/shared/models/itemdopedido.model';
import { Produto } from 'src/app/shared/models/produto.model';
import { InserirPedidoComponent } from '../inserir-pedido/inserir-pedido.component';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css'],
})
export class ListarPedidoComponent implements OnInit {
  ELEMENT_DATA!: ItemDoPedido[];

  produto_data: Produto[] = [];

  produto!: Produto;
  cliente = new Cliente(1, '', '', '');
  items: ItemDoPedido[] = [];
  pedido = new Pedido(new Date(), this.cliente);
  clienteId!: number;

  displayedColumns = ['produto', 'quantidade', 'op'];
  dataSource = new MatTableDataSource<ItemDoPedido>(this.ELEMENT_DATA);

  constructor(
    private pedidoService: PedidoService,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.clienteId = params['id']));
  }

  ngOnInit(): void {
    this.getAllPedidos();
  }

  public getAllPedidos() {
    this.pedidoService.getAllItemDoPedido(this.clienteId).subscribe((ite) => {
      this.dataSource.data = ite;
    });
  }

  inserirPedido() {
    const dialogRef = this.dialog.open(InserirPedidoComponent, {
      minWidth: '300px',
      minHeight: '300px',
      panelClass: 'custom-dialog',
      data: {id: this.clienteId},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getAllPedidos();
    });
  }

  deletarPedido(it: ItemDoPedido) {
    if (window.confirm('Tem certeza que voce quer deletar este pedido ?')) {
      this.pedidoService.removerItemPedido(it).subscribe((result) => {
        this.getAllPedidos();
      });
    }
  }
}

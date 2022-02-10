import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from './../../unique-id.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    // compileComponents espera compilação do template do componente
    // pode usar sem async, await e compileComponents, mas só funciona pq Angular atualmente usa Webpack pra buildar
    // Abordagem test-first:
    // await TestBed.configureTestingModule({
    //   declarations: [LikeWidgetComponent],
    //   providers: [UniqueIdService],
    //   imports: [FontAwesomeModule]
    // }).compileComponents();


    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    // Se não criou, é nulo, que retorna falso
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    // Por padrão, no ambiente de testes, nós devemos disparar change detection
    // É recomendado chamar o detectChanges manualmente
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    // Não chamar detectChanges no beforeEach, pois devemos atribuir as propriedades antes
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  // Opção 1:
  // Se passar um argumento antes da função do Jasmine, ele vai dar erro após certo tempo se a função não for completa
  // it(`#${LikeWidgetComponent.prototype.like.name}
  //     should trigger emission when called`, done => {
  //     fixture.detectChanges();
  //     // EventEmitter é um Observable, então podemos usar subscribe para saber quando foi disparado
  //     component.liked.subscribe(() => {
  //       // Apenas queremos que o eventEmitter seja disparado
  //       expect(true).toBeTrue();
  //       // Devemos chamar a função, que nós definimos o nome, para indicar que teste está completo
  //       done();
  //     });
  //     component.like();

  // });

  // Opção 2:
  it(`#${LikeWidgetComponent.prototype.like.name}
      should trigger (@Output liked) when called`, () => {

      // Vai monitorar se método emit foi chamado
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });
})

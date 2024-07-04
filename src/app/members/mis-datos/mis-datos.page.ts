import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginResponse, Datos, MisDatosResponse, MisDatos } from './../../models/interface';
import { LoadingController } from '@ionic/angular';
import { MisDatosService } from './../../services/mis-datos.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
})
export class MisDatosPage implements OnInit {

  isLoading: boolean = false;
  dataUsuario: Datos | null = null;
  dataMisDatos!: MisDatos;
  checkboxSi = false;
  checkboxNo = false;
  direccion!: string;
  celular!: string;
  telefono!: string;
  email!: string;
  formaPago!: string;
  numeroCuenta!: string;

  comunas: any[] = [
    { idComuna: 80, nombre: 'Algarrobo, ALGARROBO'},
    { idComuna: 128, nombre: 'Alhué, MELIPILLA'},
    { idComuna: 220, nombre: 'Alto Biobío, ALTO BIOBIO'},
    { idComuna: 29, nombre: 'Alto del Carmen, ALTO DEL CARMEN'},
    { idComuna: 6, nombre: 'Alto Hospicio, ALTO HOSPICIO'},
    { idComuna: 313, nombre: 'Ancud, ANCUD'},
    { idComuna: 33, nombre: 'Andacollo, ANDACOLLO'},
    { idComuna: 252, nombre: 'Angol, ANGOL'},
    { idComuna: 346, nombre: 'Antártica, ANTARTICA'},
    { idComuna: 17, nombre: 'Antofagasta, ANTOFAGASTA'},
    { idComuna: 223, nombre: 'Antuco, ANTUCO'},
    { idComuna: 246, nombre: 'Arauco, ARAUCO'},
    { idComuna: 1, nombre: 'Arica, ARICA'},
    { idComuna: 328, nombre: 'Aysén, PUERTO AYSEN'},
    { idComuna: 122, nombre: 'Buin, SANTIAGO'},
    { idComuna: 208, nombre: 'Bulnes, BULNES'},
    { idComuna: 47, nombre: 'Cabildo, CABILDO'},
    { idComuna: 345, nombre: 'Cabo de Hornos, NAVARINO'},
    { idComuna: 221, nombre: 'Cabrero, CABRERO'},
    { idComuna: 14, nombre: 'Calama, CALAMA'},
    { idComuna: 306, nombre: 'Calbuco, CALBUCO'},
    { idComuna: 24, nombre: 'Caldera, CALDERA'},
    { idComuna: 124, nombre: 'Calera de Tango, CALERA DE TANGO'},
    { idComuna: 52, nombre: 'Calle Larga, CALLE LARGA'},
    { idComuna: 2, nombre: 'Camarones, ARICA'},
    { idComuna: 10, nombre: 'Camiña, CAMINA'},
    { idComuna: 44, nombre: 'Canela, CANELA'},
    { idComuna: 249, nombre: 'Cañete, CAÑETE'},
    { idComuna: 279, nombre: 'Carahue, CARAHUE'},
    { idComuna: 77, nombre: 'Cartagena, CARTAGENA'},
    { idComuna: 73, nombre: 'Casablanca, CASABLANCA'},
    { idComuna: 312, nombre: 'Castro, CASTRO'},
    { idComuna: 59, nombre: 'Catemu, CATEMU'},
    { idComuna: 195, nombre: 'Cauquenes, CAUQUENES'},
    { idComuna: 107, nombre: 'Cerrillos, SANTIAGO'},
    { idComuna: 112, nombre: 'Cerro Navia, SANTIAGO'},
    { idComuna: 322, nombre: 'Chaitén, CHAITEN'},
    { idComuna: 197, nombre: 'Chanco, CHANCO'},
    { idComuna: 21, nombre: 'Chañaral, CHAÑARAL'},
    { idComuna: 156, nombre: 'Chépica, CHEPICA'},
    { idComuna: 243, nombre: 'Chiguayante, CONCEPCION'},
    { idComuna: 331, nombre: 'Chile Chico, CHILE CHICO'},
    { idComuna: 218, nombre: 'Chillán Viejo, ÑUBLE'},
    { idComuna: 198, nombre: 'Chillán, ÑUBLE'},
    { idComuna: 153, nombre: 'Chimbarongo, CHIMBARONGO'},
    { idComuna: 319, nombre: 'Chonchi, CHONCHI'},
    { idComuna: 329, nombre: 'Cisnes, CISNES'},
    { idComuna: 214, nombre: 'Cobquecura, COBQUECURA'},
    { idComuna: 305, nombre: 'Cochamó, COCHAMO'},
    { idComuna: 333, nombre: 'Cochrane, COCHRANE'},
    { idComuna: 138, nombre: 'Codegua, CODEGUA'},
    { idComuna: 212, nombre: 'Coelemu, ÑUBLE'},
    { idComuna: 202, nombre: 'Coihueco, ÑUBLE'},
    { idComuna: 149, nombre: 'Coinco, COINCO'},
    { idComuna: 189, nombre: 'Colbún, COLBUN'},
    { idComuna: 11, nombre: 'Colchane, COLCHANE'},
    { idComuna: 115, nombre: 'Colina, COLINA'},
    { idComuna: 254, nombre: 'Collipulli, COLLIPULLI'},
    { idComuna: 148, nombre: 'Coltauco, COLTAUCO'},
    { idComuna: 39, nombre: 'Combarbalá, COMBARBALA'},
    { idComuna: 233, nombre: 'Concepción, CONCEPCION'},
    { idComuna: 85, nombre: 'Conchalí, SANTIAGO'},
    { idComuna: 75, nombre: 'Concón, CONCON'},
    { idComuna: 184, nombre: 'Constitución, CONSTITUCION'},
    { idComuna: 250, nombre: 'Contulmo, CONTULMO'},
    { idComuna: 23, nombre: 'Copiapó, COPIAPO'},
    { idComuna: 32, nombre: 'Coquimbo, COQUIMBO'},
    { idComuna: 241, nombre: 'Coronel, CORONEL'},
    { idComuna: 288, nombre: 'Corral, VALDIVIA'},
    { idComuna: 326, nombre: 'Coyhaique, COYHAIQUE'},
    { idComuna: 267, nombre: 'Cunco, CUNCO'},
    { idComuna: 256, nombre: 'Curacautín, CURACAUTIN'},
    { idComuna: 127, nombre: 'Curacaví, CURACAVI'},
    { idComuna: 316, nombre: 'Curaco de Vélez, CURACO DE VELEZ'},
    { idComuna: 247, nombre: 'Curanilahue, CURANILAHUE'},
    { idComuna: 269, nombre: 'Curarrehue, CURARREHUE'},
    { idComuna: 185, nombre: 'Curepto, TALCA'},
    { idComuna: 168, nombre: 'Curicó, CURICO'},
    { idComuna: 315, nombre: 'Dalcahue, DALCAHUE'},
    { idComuna: 22, nombre: 'Diego de Almagro, DIEGO DE ALMAGRO'},
    { idComuna: 150, nombre: 'Doñihue, DOÑIHUE'},
    { idComuna: 103, nombre: 'El Bosque, SANTIAGO'},
    { idComuna: 205, nombre: 'El Carmen, EL CARMEN'},
    { idComuna: 133, nombre: 'El Monte, EL MONTE'},
    { idComuna: 79, nombre: 'El Quisco, EL QUISCO'},
    { idComuna: 78, nombre: 'El Tabo, EL TABO'},
    { idComuna: 182, nombre: 'Empedrado, EMPEDRADO'},
    { idComuna: 257, nombre: 'Ercilla, ERCILLA'},
    { idComuna: 106, nombre: 'Estación Central, SANTIAGO'},
    { idComuna: 237, nombre: 'Florida, FLORIDA'},
    { idComuna: 272, nombre: 'Freire, FREIRE'},
    { idComuna: 27, nombre: 'Freirina, FREIRINA'},
    { idComuna: 309, nombre: 'Fresia, FRESIA'},
    { idComuna: 311, nombre: 'Frutillar, FRUTILLAR'},
    { idComuna: 324, nombre: 'Futaleufú, FUTALEUFU'},
    { idComuna: 292, nombre: 'Futrono, VALDIVIA'},
    { idComuna: 281, nombre: 'Galvarino, GALVARINO'},
    { idComuna: 4, nombre: 'General Lagos, ARICA'},
    { idComuna: 274, nombre: 'Gorbea, GORBEA'},
    { idComuna: 136, nombre: 'Graneros, GRANEROS'},
    { idComuna: 330, nombre: 'Guaitecas, GUAITECAS'},
    { idComuna: 64, nombre: 'Hijuelas, HIJUELAS'},
    { idComuna: 323, nombre: 'Hualaihué, FUTALEUFU'},
    { idComuna: 173, nombre: 'Hualañé, HUALAÑE'},
    { idComuna: 244, nombre: 'Hualpén, TALCAHUANO'},
    { idComuna: 238, nombre: 'Hualqui, CONCEPCION'},
    { idComuna: 9, nombre: 'Huara, HUARA'},
    { idComuna: 28, nombre: 'Huasco, HUASCO'},
    { idComuna: 86, nombre: 'Huechuraba, SANTIAGO'},
    { idComuna: 41, nombre: 'Illapel, ILLAPEL'},
    { idComuna: 84, nombre: 'Independencia, SANTIAGO'},
    { idComuna: 5, nombre: 'Iquique, IQUIQUE'},
    { idComuna: 132, nombre: 'Isla de Maipo, ISLA DE MAIPO'},
    { idComuna: 82, nombre: 'Isla de Pascua, ISLA DE PASCUA'},
    { idComuna: 74, nombre: 'Juan Fernández, JUAN FERNANDEZ'},
    { idComuna: 62, nombre: 'La Calera, CALERA'},
    { idComuna: 102, nombre: 'La Cisterna, SANTIAGO'},
    { idComuna: 61, nombre: 'La Cruz, LA CRUZ'},
    { idComuna: 165, nombre: 'La Estrella, LA ESTRELLA'},
    { idComuna: 96, nombre: 'La Florida, SANTIAGO'},
    { idComuna: 98, nombre: 'La Granja, SANTIAGO'},
    { idComuna: 31, nombre: 'La Higuera, LA HIGUERA'},
    { idComuna: 45, nombre: 'La Ligua, LA LIGUA'},
    { idComuna: 99, nombre: 'La Pintana, SANTIAGO'},
    { idComuna: 93, nombre: 'La Reina, SANTIAGO'},
    { idComuna: 30, nombre: 'La Serena, LA SERENA'},
    { idComuna: 293, nombre: 'La Unión, VALDIVIA'},
    { idComuna: 295, nombre: 'Lago Ranco, VALDIVIA'},
    { idComuna: 327, nombre: 'Lago Verde, LAGO VERDE'},
    { idComuna: 340, nombre: 'Laguna Blanca, LAGUNA BLANCA'},
    { idComuna: 230, nombre: 'Laja, LAJA'},
    { idComuna: 116, nombre: 'Lampa, COLINA'},
    { idComuna: 286, nombre: 'Lanco, VALDIVIA'},
    { idComuna: 151, nombre: 'Las Cabras, LAS CABRAS'},
    { idComuna: 91, nombre: 'Las Condes, SANTIAGO'},
    { idComuna: 264, nombre: 'Lautaro, LAUTARO'},
    { idComuna: 245, nombre: 'Lebu, LEBU'},
    { idComuna: 174, nombre: 'Licantén, LICANTEN'},
    { idComuna: 65, nombre: 'Limache, LIMACHE'},
    { idComuna: 187, nombre: 'Linares, LINARES'},
    { idComuna: 164, nombre: 'Litueche, LITUECHE'},
    { idComuna: 58, nombre: 'Llaillay, LLAY-LLAY'},
    { idComuna: 310, nombre: 'Llanquihue, LLANQUIHUE'},
    { idComuna: 90, nombre: 'Lo Barnechea, SANTIAGO'},
    { idComuna: 105, nombre: 'Lo Espejo, SANTIAGO'},
    { idComuna: 110, nombre: 'Lo Prado, SANTIAGO'},
    { idComuna: 158, nombre: 'Lolol, LOLOL'},
    { idComuna: 275, nombre: 'Loncoche, LONCOCHE'},
    { idComuna: 190, nombre: 'Longaví, LONGAVI'},
    { idComuna: 255, nombre: 'Lonquimay, LONQUIMAY'},
    { idComuna: 248, nombre: 'Los Álamos, LOS ALAMOS'},
    { idComuna: 50, nombre: 'Los Andes, LOS ANDES'},
    { idComuna: 219, nombre: 'Los Ángeles, LOS ANGELES'},
    { idComuna: 287, nombre: 'Los Lagos, VALDIVIA'},
    { idComuna: 308, nombre: 'Los Muermos, LOS MUERMOS'},
    { idComuna: 262, nombre: 'Los Sauces, LOS SAUCES'},
    { idComuna: 43, nombre: 'Los Vilos, LOS VILOS'},
    { idComuna: 240, nombre: 'Lota, LOTA'},
    { idComuna: 260, nombre: 'Lumaco, LUMACO'},
    { idComuna: 139, nombre: 'Machalí, MACHALI'},
    { idComuna: 94, nombre: 'Macul, SANTIAGO'},
    { idComuna: 289, nombre: 'Máfil, VALDIVIA'},
    { idComuna: 108, nombre: 'Maipú, SANTIAGO'},
    { idComuna: 143, nombre: 'Malloa, MALLOA'},
    { idComuna: 166, nombre: 'Marchihue, MARCHIHUE'},
    { idComuna: 13, nombre: 'María Elena, MARIA ELENA'},
    { idComuna: 126, nombre: 'María Pinto, MARIA PINTO'},
    { idComuna: 285, nombre: 'Mariquina, VALDIVIA'},
    { idComuna: 181, nombre: 'Maule, MAULE'},
    { idComuna: 307, nombre: 'Maullín, MAULLIN'},
    { idComuna: 18, nombre: 'Mejillones, MARIA ELENA'},
    { idComuna: 268, nombre: 'Melipeuco, MELIPUCO'},
    { idComuna: 125, nombre: 'Melipilla, MELIPILLA'},
    { idComuna: 171, nombre: 'Molina, MOLINA'},
    { idComuna: 38, nombre: 'Monte Patria, MONTEPATRIA'},
    { idComuna: 137, nombre: 'Mostazal, MOSTAZAL'},
    { idComuna: 227, nombre: 'Mulchén, MULCHEN'},
    { idComuna: 229, nombre: 'Nacimiento, NACIMIENTO'},
    { idComuna: 155, nombre: 'Nancagua, NANCAGUA'},
    { idComuna: 336, nombre: 'Natales, NATALES'},
    { idComuna: 163, nombre: 'Navidad, NAVIDAD'},
    { idComuna: 228, nombre: 'Negrete, NEGRETE'},
    { idComuna: 216, nombre: 'Ninhue, NINHUE'},
    { idComuna: 63, nombre: 'Nogales, NOGALES'},
    { idComuna: 280, nombre: 'Nueva Imperial, NUEVA IMPERIAL'},
    { idComuna: 200, nombre: 'Ñiquén, ÑUBLE'},
    { idComuna: 92, nombre: 'Ñuñoa, SANTIAGO'},
    { idComuna: 334, nombre: 'O\'Higgins, O\'HIGGINS'},
    { idComuna: 140, nombre: 'Olivar, OLIVAR'},
    { idComuna: 15, nombre: 'Ollagüe, OLLAGUE'},
    { idComuna: 66, nombre: 'Olmué, OLMUE'},
    { idComuna: 296, nombre: 'Osorno, OSORNO'},
    { idComuna: 36, nombre: 'Ovalle, OVALLE'},
    { idComuna: 134, nombre: 'Padre Hurtado, SANTIAGO'},
    { idComuna: 35, nombre: 'Paihuano, PAIHUANO'},
    { idComuna: 291, nombre: 'Paillaco, VALDIVIA'},
    { idComuna: 123, nombre: 'Paine, SANTIAGO'},
    { idComuna: 325, nombre: 'Palena, PALENA'},
    { idComuna: 160, nombre: 'Palmilla, PALMILLA'},
    { idComuna: 290, nombre: 'Panguipulli, VALDIVIA'},
    { idComuna: 57, nombre: 'Panquehue, PANQUEHUE'},
    { idComuna: 49, nombre: 'Papudo, PAPUDO'},
    { idComuna: 167, nombre: 'Paredones, PAREDONES'},
    { idComuna: 191, nombre: 'Parral, PARRAL'},
    { idComuna: 104, nombre: 'Pedro Aguirre Cerda, SANTIAGO'},
    { idComuna: 178, nombre: 'Pelarco, PELARCO'},
    { idComuna: 196, nombre: 'Pelluhue, CAUQUENES'},
    { idComuna: 207, nombre: 'Pemuco, PEMUCO'},
    { idComuna: 183, nombre: 'Pencahue, PENCAHUE'},
    { idComuna: 235, nombre: 'Penco, PENCO'},
    { idComuna: 131, nombre: 'Peñaflor, SANTIAGO'},
    { idComuna: 95, nombre: 'Peñalolén, SANTIAGO'},
    { idComuna: 161, nombre: 'Peralillo, PERALILLO'},
    { idComuna: 265, nombre: 'Perquenco, PERQUENCO'},
    { idComuna: 46, nombre: 'Petorca, PETORCA'},
    { idComuna: 147, nombre: 'Peumo, PEUMO'},
    { idComuna: 8, nombre: 'Pica, PICA'},
    { idComuna: 146, nombre: 'Pichidegua, PICHIDEGUA'},
    { idComuna: 162, nombre: 'Pichilemu, SAN VICENTE DE TAGUA-TAGUA'},
    { idComuna: 203, nombre: 'Pinto, PINTO'},
    { idComuna: 120, nombre: 'Pirque, SANTIAGO'},
    { idComuna: 273, nombre: 'Pitrufquén, PITRUFQUEN'},
    { idComuna: 154, nombre: 'Placilla, PLACILLA'},
    { idComuna: 211, nombre: 'Portezuelo, PORTEZUELO'},
    { idComuna: 342, nombre: 'Porvenir, PORVENIR'},
    { idComuna: 7, nombre: 'Pozo Almonte, POZO ALMONTE'},
    { idComuna: 343, nombre: 'Primavera, PRIMAVERA'},
    { idComuna: 88, nombre: 'Providencia, SANTIAGO'},
    { idComuna: 70, nombre: 'Puchuncaví, PUCHUNCAVI'},
    { idComuna: 270, nombre: 'Pucón, PUCON'},
    { idComuna: 111, nombre: 'Pudahuel, SANTIAGO'},
    { idComuna: 118, nombre: 'Puente Alto, SANTIAGO'},
    { idComuna: 303, nombre: 'Puerto Montt, PUERTO MONTT'},
    { idComuna: 299, nombre: 'Puerto Octay, PUERTO OCTAY'},
    { idComuna: 304, nombre: 'Puerto Varas, PUERTO VARAS'},
    { idComuna: 159, nombre: 'Pumanque, PUMANQUE'},
    { idComuna: 40, nombre: 'Punitaqui, PUNITAQUI'},
    { idComuna: 338, nombre: 'Punta Arenas, PUNTA ARENAS'},
    { idComuna: 318, nombre: 'Puqueldón, PUQUELDON'},
    { idComuna: 261, nombre: 'Purén, PUREN'},
    { idComuna: 300, nombre: 'Purranque, PURRANQUE'},
    { idComuna: 55, nombre: 'Putaendo, PUTAENDO'},
    { idComuna: 3, nombre: 'Putre, ARICA'},
    { idComuna: 298, nombre: 'Puyehue, FRESIA'},
    { idComuna: 320, nombre: 'Queilén, QUEILEN'},
    { idComuna: 321, nombre: 'Quellón, QUELLON'},
    { idComuna: 314, nombre: 'Quemchi, QUEMCHI'},
    { idComuna: 226, nombre: 'Quilaco, QUILACO'},
    { idComuna: 114, nombre: 'Quilicura, SANTIAGO'},
    { idComuna: 224, nombre: 'Quilleco, QUILLECO'},
    { idComuna: 209, nombre: 'Quillón, QUILLON'},
    { idComuna: 60, nombre: 'Quillota, QUILLOTA'},
    { idComuna: 71, nombre: 'Quilpué, QUILPUE'},
    { idComuna: 317, nombre: 'Quinchao, ACHAO'},
    { idComuna: 144, nombre: 'Quinta de Tilcoco, QUINTA DE TILCOCO'},
    { idComuna: 109, nombre: 'Quinta Normal, SANTIAGO'},
    { idComuna: 69, nombre: 'Quintero, QUINTERO'},
    { idComuna: 215, nombre: 'Quirihue, QUIRIHUE'},
    { idComuna: 135, nombre: 'Rancagua, RANCAGUA'},
    { idComuna: 210, nombre: 'Ránquil, RANQUIL'},
    { idComuna: 176, nombre: 'Rauco, TALCA'},
    { idComuna: 87, nombre: 'Recoleta, SANTIAGO'},
    { idComuna: 253, nombre: 'Renaico, RENAICO'},
    { idComuna: 113, nombre: 'Renca, SANTIAGO'},
    { idComuna: 142, nombre: 'Rengo, RENGO'},
    { idComuna: 141, nombre: 'Requinoa, REQUINOA'},
    { idComuna: 192, nombre: 'Retiro, RETIRO'},
    { idComuna: 53, nombre: 'Rinconada, RINCONADA'},
    { idComuna: 294, nombre: 'Río Bueno, VALDIVIA'},
    { idComuna: 179, nombre: 'Río Claro, CURICO'},
    { idComuna: 37, nombre: 'Río Hurtado, RIO HURTADO'},
    { idComuna: 332, nombre: 'Río Ibáñez, RIO IBAÑEZ'},
    { idComuna: 301, nombre: 'Río Negro, RIO NEGRO'},
    { idComuna: 339, nombre: 'Río Verde, RIO VERDE'},
    { idComuna: 170, nombre: 'Romeral, ROMERAL'},
    { idComuna: 278, nombre: 'Saavedra, PUERTO SAAVEDRA'},
    { idComuna: 172, nombre: 'Sagrada Familia, SAGRADA FAMILIA'},
    { idComuna: 42, nombre: 'Salamanca, SALAMANCA'},
    { idComuna: 76, nombre: 'San Antonio, SAN ANTONIO'},
    { idComuna: 121, nombre: 'San Bernardo, SANTIAGO'},
    { idComuna: 199, nombre: 'San Carlos, SAN CARLOS'},
    { idComuna: 180, nombre: 'San Clemente, SAN CLEMENTE'},
    { idComuna: 51, nombre: 'San Esteban, SAN ESTEBAN'},
    { idComuna: 201, nombre: 'San Fabián, SAN FABIAN DE ALICO'},
    { idComuna: 54, nombre: 'San Felipe, SAN FELIPE'},
    { idComuna: 152, nombre: 'San Fernando, SAN FERNANDO'},
    { idComuna: 341, nombre: 'San Gregorio, SAN GREGORIO'},
    { idComuna: 204, nombre: 'San Ignacio, SAN IGNACIO'},
    { idComuna: 194, nombre: 'San Javier, SAN JAVIER'},
    { idComuna: 97, nombre: 'San Joaquín, SANTIAGO'},
    { idComuna: 119, nombre: 'San José de Maipo, SAN JOSE DE MAIPO'},
    { idComuna: 302, nombre: 'San Juan de la Costa, OSORNO'},
    { idComuna: 101, nombre: 'San Miguel, SANTIAGO'},
    { idComuna: 217, nombre: 'San Nicolás, SAN NICOLAS'},
    { idComuna: 297, nombre: 'San Pablo, SAN PABLO'},
    { idComuna: 16, nombre: 'San Pedro de Atacama, SAN PEDRO DE ATACAMA'},
    { idComuna: 242, nombre: 'San Pedro de la Paz, CONCEPCION'},
    { idComuna: 129, nombre: 'San Pedro, SAN PEDRO'},
    { idComuna: 186, nombre: 'San Rafael, TALCA'},
    { idComuna: 100, nombre: 'San Ramón, SANTIAGO'},
    { idComuna: 231, nombre: 'San Rosendo, SAN ROSENDO'},
    { idComuna: 145, nombre: 'San Vicente, SAN VICENTE DE TAGUA-TAGUA'},
    { idComuna: 225, nombre: 'Santa Bárbara, SANTA BARBARA'},
    { idComuna: 157, nombre: 'Santa Cruz, SANTA CRUZ'},
    { idComuna: 239, nombre: 'Santa Juana, SANTA JUANA'},
    { idComuna: 56, nombre: 'Santa María, SANTA MARIA'},
    { idComuna: 83, nombre: 'Santiago, SANTIAGO'},
    { idComuna: 81, nombre: 'Santo Domingo, SAN ANTONIO'},
    { idComuna: 19, nombre: 'Sierra Gorda, SAN PEDRO DE ATACAMA'},
    { idComuna: 130, nombre: 'Talagante, TALAGANTE'},
    { idComuna: 177, nombre: 'Talca, TALCA'},
    { idComuna: 234, nombre: 'Talcahuano, TALCAHUANO'},
    { idComuna: 20, nombre: 'Taltal, TALTAL'},
    { idComuna: 263, nombre: 'Temuco, TEMUCO'},
    { idComuna: 169, nombre: 'Teno, TENO'},
    { idComuna: 277, nombre: 'Teodoro Schmidt, TEODORO SCHMIDTH'},
    { idComuna: 25, nombre: 'Tierra Amarilla, TIERRA AMARILLA'},
    { idComuna: 117, nombre: 'Til Til, TIL-TIL'},
    { idComuna: 344, nombre: 'Timaukel, TIMAUKEL'},
    { idComuna: 251, nombre: 'Tirúa, TIRUA'},
    { idComuna: 12, nombre: 'Tocopilla, TOCOPILLA'},
    { idComuna: 276, nombre: 'Toltén, TOLTEN'},
    { idComuna: 236, nombre: 'Tomé, TOME'},
    { idComuna: 337, nombre: 'Torres del Paine, TORRES DEL PAINE'},
    { idComuna: 335, nombre: 'Tortel, TORTEL'},
    { idComuna: 259, nombre: 'Traiguén, TRAIGUEN'},
    { idComuna: 213, nombre: 'Treguaco, TREHUACO'},
    { idComuna: 222, nombre: 'Tucapel, TUCAPEL'},
    { idComuna: 284, nombre: 'Valdivia, VALDIVIA'},
    { idComuna: 26, nombre: 'Vallenar, VALLENAR'},
    { idComuna: 67, nombre: 'Valparaíso, VALPARAISO'},
    { idComuna: 175, nombre: 'Vichuquén, VICHUQUEN'},
    { idComuna: 258, nombre: 'Victoria, VICTORIA'},
    { idComuna: 34, nombre: 'Vicuña, VICUÑA'},
    { idComuna: 266, nombre: 'Vilcún, VILCUN'},
    { idComuna: 193, nombre: 'Villa Alegre, VILLA ALEGRE'},
    { idComuna: 72, nombre: 'Villa Alemana, VILLA ALEMANA'},
    { idComuna: 271, nombre: 'Villarrica, VILLARRICA'},
    { idComuna: 68, nombre: 'Viña del Mar, VIÑA DEL MAR'},
    { idComuna: 89, nombre: 'Vitacura, SANTIAGO'},
    { idComuna: 188, nombre: 'Yerbas Buenas, YERBAS BUENAS'},
    { idComuna: 232, nombre: 'Yumbel, YUMBEL'},
    { idComuna: 206, nombre: 'Yungay, YUNGAY'},
    { idComuna: 48, nombre: 'Zapallar, ZAPALLAR'},

  ];

  compareWith: any;
  idComuna!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private cd: ChangeDetectorRef,
    private misdatos: MisDatosService,
    private router: Router
  ) {
    //this.comunas.sort(this.compareValues('nombre'));

  }

  compareValues(key:any, order = 'asc') {
    return function innerSort(a:any, b:any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  compareWithFn = (o1:any, o2:any) => {
    return o1 === o2;
  }

  validateCelular() {
    this.celular = this.celular.replace(/[^0-9.-]/g, '');
  }

  validateTelefono() {
    this.telefono = this.telefono.replace(/[^0-9.-]/g, '');
  }

  numberOnly(event:any): boolean {
    console.log(event);
    /*const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;*/
    return true;
  }

  ngOnInit() {
    this.compareWith = this.compareWithFn;
    registerLocaleData( es );
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => console.log());
          }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  onSelectChange(selectedValue: any) {
    console.log(selectedValue);
    this.idComuna = selectedValue.target.value;
  }

  ionViewWillEnter() {
    console.log('hola...');
    this.presentLoading();
    this.authenticationService.getDatos().then((data: Datos) => {
      this.dataUsuario = data;
      this.dismissLoading();

      this.misdatos.consulta(data.rut1).subscribe((data1: MisDatosResponse) => {
        console.log(data1);
        this.dataMisDatos = data1.datos;
        this.direccion = this.dataMisDatos.direccion;
        this.celular = this.dataMisDatos.celular;
        this.telefono = this.dataMisDatos.telefono;
        this.email = this.dataMisDatos.email;
        this.formaPago = this.dataMisDatos.formaPago;
        this.numeroCuenta = this.dataMisDatos.numeroCuenta;
        this.idComuna = this.dataMisDatos.idComuna;

        if ( this.dataMisDatos.autoriza === true ) {
          this.checkboxSi = true;
        } else {
          this.checkboxNo = true;
        }

      });

    });
  }

  change1() {
    if (this.checkboxSi) {
      this.checkboxSi = false;
      this.checkboxNo = false;
    } else {
      this.checkboxSi = true;
      this.checkboxNo = false;
    }
    this.cd.detectChanges();
  }

  change2() {
    if (this.checkboxNo) {
      this.checkboxSi = false;
      this.checkboxNo = false;
    } else {
      this.checkboxSi = false;
      this.checkboxNo = true;
    }
    this.cd.detectChanges();
  }

  async presentOk(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigate(['members', 'dashboard']);
        }
      }]
    });

    await alert.present();
  }

  async presentAlert(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Validación',
      //subHeader: 'Subtitle',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  actualizar() {
    //console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email));
    //PRIMERO VERIFICO SI TENGO DATA DE USUARIO
    if (this.dataUsuario) {
      if ((this.checkboxNo === false && this.checkboxSi === true) ||
        (this.checkboxNo === true && this.checkboxSi === false)) {
        if (this.direccion.length > 0) {
          if (this.celular.length === 9) {
            if (this.telefono.length === 9) {
              if (this.email.length > 0) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) === true) {
                  this.misdatos.actualizar(
                    this.dataUsuario.rut1,
                    this.email,
                    this.direccion,
                    this.celular,
                    this.telefono,
                    this.checkboxSi,
                    this.idComuna
                  ).subscribe((data: LoginResponse) => {
                    this.presentOk(data.mensaje);
                  });
                } else {
                  this.presentAlert('Ingrese Email Válido');
                }
              } else {
                this.presentAlert('Ingrese Email Válido');
              }
            } else {
              this.presentAlert('Ingrese Teléfono fijo');
            }
          } else {
            this.presentAlert('Ingrese Teléfono celular');
          }
        } else {
          this.presentAlert('Ingrese Dirección');
        }
      } else {
        this.presentAlert('Indique si autoriza a EuroAmerica a enviar comunicaciones al mail ingresado');
      }
    } else {
      this.presentAlert('Error: No se pudo obtener la información del usuario.');
    }
  }
}

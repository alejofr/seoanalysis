<template>
    <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body border-bottom py-3 " style="border-radius: 3px 3px 0 0;position:relative;">
                                <transition name="component-fade" mode="out-in">
                                    <keep-alive>
                                            <component :is='componentIsDashboard' v-bind:alert="alert" :componentLoader="false" :styles="styleComponent"></component>
                                    </keep-alive>
                                </transition>
                                <div class="div_action_table div_flex_w ">
                                    <div class="ms-auto text-muted div_right-flex">
                                        <div class="btn-list mt-2">
                                            <button type="button" @click="openModal" class="btn btn-dark">
                                                Nuevo Análisis
                                            </button>
                                            <button type="button" class="btn btn-light" @click="downloadsExcel">
                                                Generar Excel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                    <thead>
                                        <tr>
                                            <th v-for="(column, index) in columns" :key="index">{{column.name}}</th>
                                        </tr>
                                    </thead>
                                    <transition name="component-fade" mode="out-in">
                                        <keep-alive>
                                                <component :is='componentIsTbody' v-bind:dataTbody="datatable" :pag="pagination.numPage" :num_results="pagination.numResult" v-bind:th="columns"></component>
                                        </keep-alive>
                                    </transition>
                                </table>
                            </div>
                            <div class="card-footer d-flex align-items-center">
                                <p class="m-0 text-muted">Mostrando <span>{{pagination.numResult}}</span> de <span>{{pagination.totalResult}}</span> Entradas</p>
                                <ul class="pagination m-0 ms-auto">
                                    <li class="page-item">
                                        <a v-if="this.pagination.numPage == 1" class="page-link disabled prev arrow-ti" href="javascript:void(0)" tabindex="-1" aria-disabled="true">
                                            <i class="ti ti-arrow-left"></i>
                                        </a>
                                        <router-link  :to="{ name:'Dashboard', query: { page: pagination.numPage - 1 } }" class="page-link prev arrow-ti" v-else>
                                            <i class="ti ti-arrow-left"></i>
                                        </router-link>
                                    </li>
                                    <li class="page-item">
                                        <a v-if="Math.ceil(pagination.totalResult/pagination.numResult) == this.pagination.numPage" class="page-link arrow-ti disabled next" href="javascript:void(0)">
                                            <i class="ti ti-arrow-right"></i>
                                        </a>
                                        <router-link :to="{ name:'Dashboard', query: { page: pagination.numPage + 1 } }" class="page-link arrow-ti next" v-else ><i class="ti ti-arrow-right"></i></router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal Nuevo Analisis -->
                <div class="modal modal-blur fade" :class="{'show': show == true}" id="modal-report" tabindex="-1" v-show="show" style="display:block;" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Nuevo Análisis</h5>
                                <button type="button" class="btn-close" @click="closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <transition name="component-fade" mode="out-in">
                                    <keep-alive>
                                           <component :is='componentIsModal' v-bind:alert="alert" :componentLoader="true" :styles="styleComponent"></component>
                                    </keep-alive>
                                </transition>
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="mb-3">
                                            <label class="form-label">Dominio</label>
                                            <div class="input-group input-group-flat">
                                                <span class="input-group-text">
                                                    {{type_request}}
                                                </span>
                                                <input type="text" v-model="dominio" class="form-control ps-0" @change="checkDominio()" autocomplete="off">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label class="form-label">Http o Https</label>
                                            <select class="form-select" v-model="type_request">
                                                <option value="https://">Https</option>
                                                <option value="http://">Http</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="mb-3">
                                            <label class="form-label">Arbol Urls</label>
                                            <textarea class="form-control" v-model="arbol_urls" disabled rows="3"></textarea>
                                            <p class="mt-3 form-message">«arbol urls» son todas urls del dominio.</p>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-label">Cargar Arbol Urls</div>
                                            <input type="file" id="fileExcel" class="form-control" @change="fileExcel($event)">
                                            <p class="mt-3 form-message">«archivo excel» y todas la urls debe estar en la primera columna.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-light link-secondary" @click="closeModal" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <div class="ms-auto col-auto">
                                    <div class="btn-list">
                                        <button class="btn btn-outline-danger" @click="resetForm">
                                            <i class="ti ti-forms me-1"></i>
                                            Limpiar
                                        </button>
                                        <button  class="btn btn-primary" data-bs-dismiss="modal" @click="sendAnalisis">
                                            <i class="ti ti-plus me-1"></i>
                                            Crear análisis
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import readXlsFile from 'read-excel-file';
import exportFromJSON from 'export-from-json'

const MessageComponent = () => import(/* webpackChunkName: "MessageComponent" */'./MessageComponent.vue');
const LoaderContainerComponent = () => import('./LoaderContinerComponent.vue');

const TablesSkeletonComponent = () => import('./TablesSkeletonComponent.vue');
const Tbody = () => import('./TbodyComponent.vue');

export default {
    name: 'DashboardComponent',
    data() {
        return {
            columns: [
                {name: 'Url', value: ''},
                {name: 'title', value: ''},
                {name: 'Description', value: ''},
                {name: 'Keywords', value: ''},
                {name: 'Status', value: ''},
            ],
            show: false,
            type_request: 'https://',
            dominio: '',
            arbol_urls: '',
            componentIsDashboard: LoaderContainerComponent,
            componentIsTbody: TablesSkeletonComponent,
            componentIsModal: '',
            alert: {
                msg: '',
                clss: ''
            },
            styleComponent: '',
            datatable: [],
            
        };
    },
    computed: {
        pagination(){
            const paginate = {
                numPage: 1,
                numResult: 8,
                totalResult: this.datatable.length,
            }

            console.log(Math.ceil(paginate.totalResult/paginate.numResult))

            if(  this.$route.query.page )
                paginate.numPage = this.$route.query.page

            return paginate;
        }
    },
    beforeCreate() {
        this.$nextTick(function () {
           if( window.localStorage.getItem('arbol_urls') !== undefined && window.localStorage.getItem('arbol_urls') 
               && window.localStorage.getItem('dominio') !== undefined && window.localStorage.getItem('dominio') 
               && window.localStorage.getItem('type_request') !== undefined && window.localStorage.getItem('type_request') ){
                this.dominio = window.localStorage.getItem('dominio');
                this.type_request  = window.localStorage.getItem('type_request');
                this.arbol_urls = window.localStorage.getItem('arbol_urls');

                this.analyze();
           }else{
               this.componentIsTbody = Tbody
               this.componentIsDashboard = MessageComponent
               this.alert.msg = "No se encontraron datos para analizar";
                this.alert.clss = 'error';
           }
        })
    },
    components: {
        MessageComponent: MessageComponent(),
        LoaderContainerComponent: LoaderContainerComponent(),
        TablesSkeletonComponent: TablesSkeletonComponent(),
        Tbody: Tbody()
    },
    methods: {
        openModal(){
            this.show = true;
            this.componentIsDashboard = ''
        },
        closeModal(){
            this.show = false;
        },
        analyze(){
            const obj = {
                arbol: this.constructArbolUrls()
            }
            this.axios.post('audit-pages-head', obj).then(response => {
                console.log(response.data)
                this.componentIsDashboard = ''
                this.componentIsTbody = Tbody;
                this.datatable = response.data.results
                this.pagination.totalResult = this.datatable.length;
                this.constructLocalStorage('send')
            }).catch(error => {
                console.log(error)
                this.alert = {
                    msg: 'Error de servidor, por favor intentar mas tarde',
                    clss: 'error'
                }
                this.componentIsDashboard = MessageComponent
                this.componentIsTbody = Tbody;
            });
        },
        constructLocalStorage(action){
            if( action == 'send' ){
                window.localStorage.setItem('type_request', this.type_request);
                window.localStorage.setItem('dominio', this.dominio);
                window.localStorage.setItem('arbol_urls', this.arbol_urls);
            }else{
                window.localStorage.removeItem('type_request')
                window.localStorage.removeItem('dominio')
                window.localStorage.removeItem('arbol_urls')
            }
        },
        constructDominio(){
            return this.type_request+''+this.dominio
        },
        constructArbolUrls(){
            let arbol = this.arbol_urls.split('|');
                arbol.unshift(this.constructDominio());
            return arbol
        },
        downloadsExcel(){
            if( this.datatable.length === 0 ){
                this.alert = {
                    msg: 'Error, No hay análisis para descargar',
                    clss: 'error'
                }
                this.componentIsDashboard = MessageComponent
            }else{
                const data = this.datatable
                const filename = 'downloads'
                const exportType = exportFromJSON.types.xls
                exportFromJSON({ data, filename, exportType })
            }
        },
        fileExcel($event){
            console.log($event)
            console.log($event.target.files[0].name.lastIndexOf(".xlsx"))
            console.log($event.target.files[0].name.lastIndexOf(".xls"))
            if ( this.checkDominio() ){
                if ( $event.target.files[0].name.lastIndexOf(".xls") < 0 || $event.target.files[0].name.lastIndexOf(".xlsx") < 0 || this.dominio == '' ) {
                    $event.target.value = "";
                    this.alert.msg = "Error, el archivo debe ser «.xls» ó «.xlsx»";
                    this.alert.clss = "error";

                    if( this.dominio == "" ){
                        this.alert.msg = "Error, debe agregar primero el dominio.";
                    }

                    this.arbol_urls = ""
                    this.componentIsModal = MessageComponent;
                } else {
                    this.styleComponent = 'margin: -1.5rem;';
                    this.componentIsModal = LoaderContainerComponent;
                    readXlsFile($event.target.files[0]).then((rows) => {
                        let aux = '';
                        let arregloError = [];
                        this.alert.msg = "Se agrego la lista de urls para el análisis";
                        this.alert.clss = 'updated';
                        for (let i = 0; i < rows.length; i++) {
                            if( rows[i][0] != null ){
                                if( rows[i][0].includes(this.dominio) && rows[i][0].includes(this.type_request)){
                                    aux = ( aux == "" ) ? aux+''+rows[i][0] : aux+'|'+rows[i][0];
                                }else{
                                    arregloError.push(rows[i][0])
                                }
                            }
                        }

                        if( arregloError.length != 0 ){
                            this.alert.msg = "Hubo algunas urls que no coinciden con el dominio";
                            this.alert.clss = 'error';
                        }
                        
                        setTimeout(() => {
                            this.componentIsModal = MessageComponent;
                            if( aux == "" ){
                                $event.target.value = "";
                                this.arbol_urls = ""
                            }else{
                                this.arbol_urls = aux;
                            }
                                
                        }, 3000);
                        
                    });
                }
            }
            
        },
        resetForm(){
            this.type_request =  'https://',
            this.dominio =  '',
            this.arbol_urls =  '',
            document.getElementById('fileExcel').value = "";
            if( window.localStorage.getItem('arbol_urls') !== undefined && window.localStorage.getItem('arbol_urls') 
               && window.localStorage.getItem('dominio') !== undefined && window.localStorage.getItem('dominio') 
               && window.localStorage.getItem('type_request') !== undefined && window.localStorage.getItem('type_request') ){
                this.constructLocalStorage('delete')
           }
        },
        sendAnalisis(){
            this.alert.msg = '';
            this.alert.clss = '';

            if( this.dominio != '' && this.arbol_urls != '' && this.type_request != '' ){
                this.show = false;
                this.componentIsModal = ''
                this.componentIsDashboard = LoaderContainerComponent
                this.componentIsTbody = TablesSkeletonComponent;
                this.analyze()
            }else{
                this.alert.msg = "Por favor, debe ingresar el dominio y subir el archivo excel, del arbol de rutas, del dominio.";
                this.alert.clss = "error";
                this.componentIsModal = MessageComponent;
            }
        },
        checkDominio(){
            var arr = new Array(
                '.com','.net','.org','.biz','.coop','.info','.museum','.name',
                '.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
                '.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
                '.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
                '.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
                '.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
                '.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
                '.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
                '.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
                '.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
                '.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
                '.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
                '.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
                '.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
                '.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
                '.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
                '.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
                '.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
                '.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
                '.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
                '.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
                '.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
                '.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
                '.wf','.ye','.yt','.yu','.za','.zm','.zw'
            );

            if ( this.dominio != '' ){
                var comprobacion = this.dominio;
                var val = true;
                var punto = comprobacion.lastIndexOf(".");
                var nombre_dominio = comprobacion.substring(0,punto);
                var extension = comprobacion.substring(punto,comprobacion.length);
                this.alert.msg = "";

                if(punto>2 && punto<57){
                    for(var i=0; i<arr.length; i++)
                    {
                        if(extension == arr[i])
                        {
                            val = true;
                            break;
                        }
                        else
                        {
                            val = false;
                        }
                    }
                    if(val == false)
                    {
                        this.alert.msg = "la extensionension de tu dominio "+extension+" no es correcta";
                        //return false;
                    }else{
                        for(var j=0; j<nombre_dominio.length; j++)
                        {
                            var dh = nombre_dominio.charAt(j);
                            var hh = dh.charCodeAt(0);
                            if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46)
                            {
                                if((j==0 || j==nombre_dominio.length-1) && hh == 45)  
                                {
                                    this.alert.msg = "Tu nombre de dominio no puede contener el simbolo guion '-' al principio ni al final";
                                    //return false;
                                }
                            }else    {
                                this.alert.msg = "El dominio no puede contener caracteres especiales";
                                //return false;
                            }
                        }
                    }
                }else{
                    this.alert.msg = "El numero de caracteres insertado no es correcto para el nombre de dominio ";
                }  

                if( this.alert.msg != '' ){
                    this.alert.clss = 'error';
                    this.componentIsModal = MessageComponent;
                    return false;
                }
            }   
            
            this.componentIsModal = '';
            return true;
        }
    },
};
</script>

<style scoped>
    .div_flex_w, .div_flex_r{
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
    }

    .div_flex_w{
        -webkit-flex-wrap: wrap;
        -moz-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        -o-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .div_flex_r{
        -ms-align-items: center;
        align-items: center;
    }

    .div_left-flex select{
        border-radius: 0;
        border: 1px solid #b9b9b9;
        color: #b9b9b9;
    }
   
    .div_left-flex input[type="radio"]{
        border: 2px solid #b9b9b9;
    }
    .div_right-flex{
        padding-top: 3px;
    }

    .bodyt-loading{
        position: relative;
        width: 100%;
         height: 220px;
    }
    .loading-tables{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-content: center;
        justify-content: center;
        background-color: rgb(255 255 255);
        -webkit-transition: all .4s;
        -o-transition: all .4s;
        -moz-transition: all .4s;
        transition: all .4s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }

    @media (max-width: 580px){
        .div_left-flex,.div_right-flex{width: 100%;}
    }

    @media (max-width: 380px){
        .div_select_column{width: 100%;}
        .div_right-flex .btn-list{
            margin-bottom: 0 !important;
            margin-right: 0;
        }

        .div_right-flex .btn-list > *{
            margin: 0 !important;
            width: 100%;
            margin-bottom: 10px !important;
        }

        .div_right-flex .btn-list > .btn.btn-danger{
            margin-left: auto !important;
        }
    }
</style>
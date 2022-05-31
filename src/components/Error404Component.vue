<template>
    <div class="flex-column w-100 h-100">
        <div class="">
            <div class="page page-center">
                <div class="container-tight py-4">
                    <div class="empty">
                        <div class="empty-header">404</div>
                            <p class="empty-title">Oops… Página No Encontrada</p>
                            <p class="empty-subtitle text-muted">
                                Lo sentimos pero no se encontró la página que busca
                            </p>
                        <div class="empty-action">
                            <button type="button" class="btn btn-primary" @click="volver">
                                <i class="ti ti-arrow-left me-2"></i>
                                Volver atrás
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Error404Component',
    methods: {
        volver(){
             this.$router.go(-1)
        }
    }
}
</script>
<template>
    <div class="alert-message is-dismissible" :class="alert.clss" v-show="show">
        <p>{{alert.msg}}</p><button class="notice-message_close" @click="closeAlert"><i class="ti ti-x"></i></button>
    </div>
</template>

<script>
export default {
    name: 'MessageComponent',
    props: ['alert'],
    data(){
        return {
            show: true,
            close: 0
        }
    },
    updated() {
        this.show = ( this.close == 0 ) ? true : this.show ;
        if ( this.close == 1 ){
            this.close = 0;
        }
            
        
    },
    methods: {
        closeAlert(){
            this.show = false;
            this.close = 1;
        }
    }
};
</script>
<style scoped>
.alert-message{
  position: relative;
  background: #fff;
  border: 1px solid #c3c4c7;
  border-left-width: 4px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 4%);
  margin: 15px 0;
  padding: 1px 38px 1px 12px;
}

.alert-message p{
  margin: 0.5em 0;
  padding: 2px;
  font-size: 14px;
}

.notice-message_close{
  position: absolute;
  top: 0;
  right: 0px;
  border: none;
  margin: 0;
  padding: 9px;
  background: 0 0;
  color: #787c82;
  cursor: pointer;
}

.notice-success, div.updated {
  border-left-color: #00a32a;
}

.notice-success, div.error {
  border-left-color: #d63939;
}
</style>
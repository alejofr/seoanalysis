<template>
    <tbody>
        <tr v-for="(item, index) in dataTbody" :key="index" v-show="(pag - 1) * num_results <= index  && pag * num_results > index">
            <td>
                <span class="txt-wrapeer"> {{ item.url }}</span>
            </td>
            <td>
                <span class="txt-wrapeer"> {{ item.title }}</span>
            </td>
            <td>
                <span class="txt-wrapeer"> {{ item.description }}</span>
            </td>
             <td>
                <span class="txt-wrapeer"> {{ item.keywords }}</span>
            </td>
            <td>
                <span class="btn badge-status cl1 hover-cl0" :class="{'bg-success': item.status == 200, 'bg-danger': item.status != 200 }">
                    {{item.status}}
                </span>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: 'TbodyComponent',
    props: ['dataTbody', 'num_results', 'pag'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>
<style>
    .txt-wrapeer{
        display: -webkit-box!important;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }
</style>
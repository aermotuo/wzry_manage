<template>
    <Table :loading="loading" border :columns="columns7" :data="data6"></Table>
</template>
<script>
    export default {
        data () {
            return {
                loading: true,
                columns7: [
                    {
                        title: '昵称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        },
                        sortable: true
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        sortable: true
                    },
                    {
                        title: '职务',
                        key: 'post',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        sex: 18,
                        post: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        sex: 24,
                        post: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        sex: 30,
                        post: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        sex: 26,
                        post: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
        created () {
          setTimeout(() => {
            this.loading = false
          }, 3000)
        }
    }
</script>

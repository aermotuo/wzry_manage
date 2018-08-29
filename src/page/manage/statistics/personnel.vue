<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col span="12">
        <Button @click="addPersonnel" type="primary">添加人员</Button>
      </Col>
      <Col offset="6" span="6">
        <Input v-model="searchData" icon="android-search" placeholder="Enter something..." style="width: 100%"></Input>
      </Col>
    </Row>
    <div class="p-table">
      <Table :loading="loading" border :columns="columns" :data="list"></Table>
    </div>
    <DialopPersonnel :name.sync="name" :visible.sync="visible" :isDelete.sync="isDelete" :title="title" @confim="handleUserInfo" :id.sync="id"></DialopPersonnel>
  </div>
</template>
<script>
import DialopPersonnel from '@/components/dialog/DialogPersonnel'
export default {
  components: {
    DialopPersonnel
  },
  data () {
    return {
      title: '',
      searchData: '',
      id: '',
      name: '',
      visible: false,
      isDelete: false,
      loading: true,
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '职务',
          key: 'post'
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
                      this.edit(params);
                    }
                  }
                }, 'Edit'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                }, 'Delete')
              ])
          }
        }
      ],
      list: []
    }
  },
  computed: {
    apiUrl () {
      return this.$store.state.apiUrl
    }
  },
  methods: {
    addPersonnel () {
      this.title = '添加人员'
      this.visible = true
    },
    edit (params) {
      this.id = params.row._id;
      this.title = '修改信息'
      this.visible = true;
    },
    remove (params) {
      this.name = params.row.name;
      this.id = params.row._id;
      this.title = '删除人员'
      this.visible = true;
      this.isDelete = true;
    },
    handleUserInfo () {
      this.visible = false;
      this.isDelete = false;
      this.name = '';
      this.id = '';
      this.findPersonAll();
    },
    findPersonAll () {
      this.loading = true;
      this.$axios({
        method: 'get',
        url: this.apiUrl + '/api/manage/findPersonAll'
      }).then((res) => {
        this.loading = false
        this.$set(this, 'list', res.data)
      });
    }
  },
  created () {
    this.findPersonAll();
  }
}
</script>
<style lang="scss" scoped>
  .p-table{
    margin-top:15px;
  }
</style>

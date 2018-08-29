<template>
  <Modal v-model="_visible" :title="title" @on-ok="ok" @on-cancel="_visible = false" :mask-closable="false" :closable="false">
    <div style="color:#ed3f14;" v-if="isDelete">
      是否删除{{this.name}}成员的相关信息?
    </div>
    <Form v-if="!isDelete" :model="person" label-position="left" :label-width="100">
      <FormItem label="昵称">
        <Input v-model="person.name"></Input>
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="person.sex">
            <Radio label="男"></Radio>
            <Radio label="女"></Radio>
            <Radio label="未知"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="职务">
        <RadioGroup v-model="person.post">
            <Radio label="队长"></Radio>
            <Radio label="副队长"></Radio>
            <Radio label="成员"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '设置'
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set () {
        this.$emit('update:visible', false);
        this.$emit('update:isDelete', false);
        this.$emit('update:name', '');
        this.$emit('update:id', '');
      }
    },
    apiUrl () {
      return this.$store.state.apiUrl
    }
  },
  data () {
    return {
      person: {
        id: '',
        name: '',
        sex: '未知',
        post: '成员'
      }
    }
  },
  watch: {
    '_visible': function (n, o) {
      if (n && this.id !== '') {
        this.getPerson();
      }
    }
  },
  methods: {
    removePerson () {
      this.$axios({
        method: 'post',
        url: this.apiUrl + '/api/manage/removeUserById',
        data: {
          _id: this.id
        }
      }).then((res) => {
        this.clearInput();
        this.$emit('confim');
      });
    },
    setPerson () {
      this.$axios({
        method: 'post',
        url: this.apiUrl + '/api/manage/editInfoById',
        data: {
          _id: this.id,
          name: this.person.name,
          sex: this.person.sex,
          post: this.person.post
        }
      }).then((res) => {
        this.clearInput();
        this.$emit('confim');
      });
    },
    getPerson () {
      this.$axios({
        method: 'get',
        url: this.apiUrl + '/api/manage/findInfoById?_id=' + this.id
      }).then((res) => {
        this.person.name = res.data.name;
        this.person.sex = res.data.sex;
        this.person.post = res.data.post;
      });
    },
    addPerson () {
      this.$axios({
        method: 'post',
        url: this.apiUrl + '/api/manage/addperson',
        data: {
          name: this.person.name,
          sex: this.person.sex,
          post: this.person.post
        }
      }).then((res) => {
        this.clearInput();
        this.$emit('confim');
      });
    },
    clearInput () {
      this.id = '';
      this.person.id = '';
      this.person.name = '';
      this.person.sex = '未知';
      this.person.post = '成员';
    },
    ok () {
      if (this.id === '') {
        this.addPerson();
      }
      if (this.id !== '' && !this.isDelete) {
        this.setPerson();
      }
      if (this.isDelete) {
        this.removePerson();
      }
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
  .person-info{
    padding-bottom:10px;
    &:last-child{
      padding-bottom:0;
    }
  }
</style>

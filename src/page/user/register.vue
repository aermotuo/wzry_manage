<template>
	<div class="p-login__bd">
		<div class="p-login__window">
			<div class="p-login__title">
				注册账号
			</div>
			<div class="p-login__input">
				<Form ref="formInline" :model="user" :rules="prompt" block>
	        <FormItem prop="username">
            <Input type="text" :value.sync="user.username" v-model="user.username" size="large" placeholder="Username">
              <Icon type="person" slot="prepend"></Icon>
            </Input>
	        </FormItem>
	        <FormItem prop="password">
            <Input type="password" :value.sync="user.password" v-model="user.password" size="large" placeholder="Password">
              <Icon type="locked" slot="prepend"></Icon>
            </Input>
	        </FormItem>
	        	<div class="p-login__btn" @click="handleSubmit('formInline')">注册</div>
		    </Form>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import md5 from 'md5';
export default {
    data () {
    		const validateUsername = (rule, value, callback) => {
    			console.log(value);
          if (!value) {
              return callback(new Error('用户名不能为空'));
          }
          this.$axios(this.apiUrl + '/api/findUserName', {params: {
          	username: value
          }}).then((res) => {
          	if (res.data.type) {
          		return callback(new Error(res.data.message));
          	} else {
          		callback()
          	}
          })
        };
        return {
        		type: false,
            user: {
                username: '',
                password: ''
            },
            prompt: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    	apiUrl () {
    		return this.$store.state.apiUrl
    	}
    },
    methods: {
    	handleSubmit (name) {
    		this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios({
						  method: 'post',
						  url: this.apiUrl + '/api/register',
						  data: {
						    username: this.user.username,
						    password: md5(this.user.password)
						  }
						}).then((res) => {
							this.$Message.success(res.data.message, '3秒进行跳转');
							console.log(res.data.time);
							setTimeout(() => {
								this.$router.push('/')
							}, res.data.time)
						});
          } else {
            this.$Message.error('请填写正确的信息!');
          }
        })
    	}
    }
}
</script>

<style lang="scss">
.p-login__bd{
	position:absolute;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(45deg, #6dc0e0, #6ce89a);
}

.p-login__window{
	position:absolute;
	width:500px;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
}
.p-login__title{
	font-size:24px;
	text-align:center;
	border-bottom:1px solid #dedede;
	padding:15px 0;
}
.p-login__window{
	background-color:#fff;
	border-radius:10px;
	overflow:hidden;
}
.p-login__input{
	padding:25px 50px;
	background-color:#fff;
}
.p-login__btn{
	text-align:center;
	color:#fff;
	font-size:16px;
	padding:5px 0;
	border-radius:5px;
	background-color:#6ce89a;
	cursor:pointer;
}
</style>

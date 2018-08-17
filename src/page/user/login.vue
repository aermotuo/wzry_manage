<template>
	<div class="p-login__bd">
		<div class="p-login__window">
			<div class="p-login__title">
				王者荣耀战队管理平台
			</div>
			<div class="p-login__input">
				<Form ref="formInline" :model="user" :rules="ruleInline" block>
	        <FormItem prop="user">
            <Input type="text" v-model="user.username" size="large"	 placeholder="Username">
              <Icon type="person" slot="prepend"></Icon>
            </Input>
	        </FormItem>
	        <FormItem prop="password">
            <Input type="password" v-model="user.password" size="large" placeholder="Password">
              <Icon type="locked" slot="prepend"></Icon>
            </Input>
	        </FormItem>
			    <Row :gutter="16">
				    <i-col span="12">
				    	<div class="p-login__btn p-login__btn-login" @click="login()">登录</div>
				    </i-col>
				    <i-col span="12">
				    	<div class="p-login__btn p-login__btn-register" @click="register()">注册</div>
				    </i-col>
			    </Row>
		    </Form>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import md5 from 'md5'
export default {
    data () {
        return {
            user: {
                username: '',
                password: ''
            },
            ruleInline: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    	apiUrl () {
    		return this.$store.state.apiUrl;
    	}
    },
    methods: {
    	login () {
    		this.$axios({
				  method: 'post',
				  url: this.apiUrl + '/api/login',
				  data: {
				    username: this.user.username,
				    password: md5(this.user.password)
				  }
				}).then((res) => {
					if (res.status === 200) {
						if (res.data.type) {
							this.$Message.success(res.data.message);
						} else {
							this.$Message.error(res.data.message);
						}
					} else {
						this.$Message.error(res.data.message);
					}
    		})
    	},
    	register () {
    		this.$router.push('/register')
    	}
    }
}
</script>

<style lang="scss">
.p-login__bd{
	position:absolute;
	width: 100%;
	height: 100%;
	// background-image: linear-gradient(45deg, #6dc0e0, #6ce89a);
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
	cursor:pointer;
}
.p-login__btn-login{
	background-color:#6dc0e0;
}
.p-login__btn-register{
	background-color:#6ce89a;
}
</style>

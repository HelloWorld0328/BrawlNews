# 임포트
from tkinter import *

### 선언
## 함수선언
def login_id_entry_get_function():
    """아이디 값받아서 리턴"""
    global login_id_entry
    login_id_entry_get=login_id_entry.get()
    if login_id_entry_get=="":
        raise ERROR_login_idOrPW_entry_is_blank()
    return login_id_entry_get

def login_if_get_in_listUser():
    """아이디 값 받아서 유저리스트에 있는 아이디가 있으면 True출력하고 아니면 false출력하는 함수"""
    global list_Users
    if login_id_entry_get_function() in list_Users:
        if_user_in_userlist=True
    else:
        if_user_in_userlist= False
    return if_user_in_userlist    


## 변수선언
# 시스템 변수 설정
win=Tk()

loginPage=Frame(win)

## 에러선언

class ERROR_login_idOrPW_entry_is_blank(Exception):
    def __init__(self):
        self.message = "login_id_entry 또는 login_pw_entry에서 값이 입력되지 않았습니다."
        super().__init__(self.message)
class ERROR_gotten_idOrPW_is_not_correct(Exception):
    def __init__(self):
        self.message = "login_id_entry 또는 login_pw_entry의 값이 리스트에 있는 값에 일치하지 않습니다."
        super().__init__(self.message)

# 아이디,패스워드, 각종정보들 저장 db
list_Users=[
    {"name":"admin1234","pw":"!passwordAdmin1234"}
]
# 로그인 페이지 위젯 변수 설정
login_id_text=Label(text="ID를 입력해주세요.")
login_id_entry=Entry()
login_pw_text=Label(text="ID를 입력해주세요.")
login_pw_entry=Entry()
login_check_button=Button( text="확인")



win.mainloop()
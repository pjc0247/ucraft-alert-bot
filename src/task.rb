require 'mail'
require 'json'

def run cmd, *args
  IO.popen([cmd, *args]) do |io|
    return io.read
  end
end

result = JSON.parse(run("casperjs", "check.js"))

exit if result["alert"] == false

mail = Mail.new do
  from     'pjc0247@naver.com'
  to       'pjc0247@nhnnext.org'
  subject  '[UCRAFT] 공격 알림'
  body '공격ㄱ격격옴'

  add_file 'capture.png'
end

mail.delivery_method :sendmail, :location => "./sendmail"
mail.deliver

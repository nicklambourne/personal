class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def main
    render html: "main page"
  end

  def goodbye
    render html: "bye, bitch!";
  end

  def yo
    render html: "hey there!";
  end
end

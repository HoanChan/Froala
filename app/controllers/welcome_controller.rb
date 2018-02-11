class WelcomeController < ApplicationController
  def index
  end
  def core
  		render plain: params[:script].inspect
  		# configurationjs
  	    # render :nothing => true
  end
  def integration
  	if params[:script].inspect ==  '"configurationjs"'
  		configurationjs
  	else
  		render plain: params[:script].inspect
  	end
  end
  private
  def configurationjs
  		# render plain: "alert('hola')" 
  end
end

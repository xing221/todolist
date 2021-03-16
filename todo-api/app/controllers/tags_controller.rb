class TagsController < ApplicationController
  def index
  	tags = Tag.order("created_at ASC")
  	render json: tags, include: :todos
  end

  def show
  	tag = Tag.find(params[:id])
  	render json: tag, include: :todos
  end

  def destroy
  	tag = Tag.find(params[:id])
  	tag.todos.map {|t| t.destroy}
  	tag.destroy
  	head :no_content, status: :ok
  end

end

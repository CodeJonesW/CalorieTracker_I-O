class GoalsController < ApplicationController
    def index
        @goals = Goal.all
        render json: @goals
    end

    def create
        @goal = Goal.create(g_params)
        render json: @goal
    end

    def show
        begin @goal = Goal.find(params[:id])
            render json: @goal
        rescue
            render json: {status: "error", code: 404, message: "Goal does not exist"}
        end
    end

    def destroy
        @goal = Goal.destroy(params[:id])
    end

    def update
        @goal = Goal.find(params[:id])
        if @goal.update(g_params)
            render json: @goal
        else
            render json: @goal.errors, status: :unprocessable_entity
        end
    end


    private

	def g_params
		params.require(:goal).permit(:user_id, :completed, :calories_to_burn, :category, :distance)
    end
end

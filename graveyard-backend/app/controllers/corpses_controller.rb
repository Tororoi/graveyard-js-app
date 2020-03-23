class CorpsesController < ApplicationController

    def index
        corpses = Corpse.all
        render json: corpses
    end

    def show
      corpse = Corpse.find(params[:id])
      if corpse
        render json: corpse
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    def create
        corpse = Corpse.create(create_corpse_params)
        if corpse.valid?
          render json: corpse
        else
          render json: { errors: corpse.errors.full_messages }, status: 403
        end
    end

    def destroy
      corpse = Corpse.find(params[:id])
      if corpse
        corpse.destroy
        render json: corpse, status: 200
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    private

    def create_corpse_params
      params.permit(:name, :speed, :flowers_needed, :grave_id)
    end

end

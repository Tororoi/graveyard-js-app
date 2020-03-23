class CreateFlowers < ActiveRecord::Migration[6.0]
  def change
    create_table :flowers do |t|
      t.string :name
      t.integer :worth
      t.belongs_to :grave, null: false, foreign_key: true

      t.timestamps
    end
  end
end

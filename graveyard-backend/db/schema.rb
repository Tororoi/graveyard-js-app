# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_20_175434) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "corpses", force: :cascade do |t|
    t.string "name"
    t.float "speed"
    t.integer "flowers_needed"
    t.bigint "grave_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grave_id"], name: "index_corpses_on_grave_id"
  end

  create_table "flowers", force: :cascade do |t|
    t.string "name"
    t.integer "worth"
    t.bigint "grave_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grave_id"], name: "index_flowers_on_grave_id"
  end

  create_table "graves", force: :cascade do |t|
    t.string "name"
    t.string "epitaph"
    t.string "lifespan"
    t.boolean "open"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "corpses", "graves", column: "grave_id"
  add_foreign_key "flowers", "graves", column: "grave_id"
end

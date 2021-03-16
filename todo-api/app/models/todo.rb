class Todo < ApplicationRecord
	has_many :taggings, :dependent => :destroy
	has_many :tags, through: :taggings
	validates :title, presence: true
end

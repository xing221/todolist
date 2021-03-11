class Tag < ApplicationRecord
	has_many :taggings, :dependent => :destroy
	has_many :todos, through: :taggings
end

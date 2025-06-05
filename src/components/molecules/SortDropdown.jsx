import Input from '../atoms/Input';

      const SortDropdown = ({ sortBy, onSortChange }) => {
        return (
          <Input
            as="select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </Input>
        );
      };

      export default SortDropdown;